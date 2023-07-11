from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

memos = []
app = FastAPI()

class Memo(BaseModel):
  id: int
  content: str
  
@app.post('/memos')
def create_memo(memo:Memo):
  memos.append(memo)
  return '메모 추가에 성공했습니다.'

@app.get('/memos')
def get_memos():
  return memos

@app.put('/memo/{memo_id}')
def update_memo(req_memo:Memo):
  for memo in memos:
    if memo.id == req_memo.id:
      memo.content = req_memo.content
      return '메모가 수정되었습니다.'
  return '메모 수정이 실패하였습니다.'  

@app.delete('/memo/{memo_id}')
def delete_memo(memo_id):
  for index, memo in memos:
    if memo.id == memo_id:
      memos.pop(index)
      return '메모가 삭제되었습니다.'
  return '메모 삭제가 실패되었습니다.'  
app.mount('/',StaticFiles(directory='static', html='True'), name='static')