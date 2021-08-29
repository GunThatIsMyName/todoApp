import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const LSData = "list"
const getLocalData = ()=>{
  let list = localStorage.getItem(LSData);
  if(list){
    return JSON.parse(list)
  }return []
}


function App() {
  const [name,setName]=useState('')
  const [list,setList] = useState(getLocalData)
  const [isEditing,setIsEditing] =useState(false)
  const [editId,setEditId]=useState(null);
  const [alret,setAlert]=useState({msg:'',type:'',show:false})
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(name === ""){
      showAlert("please type your things",'danger',true)
    }else if(name && isEditing){
      setList(EditItem)
      showAlert("item has been changed",'danger',true)
      setIsEditing(false)
      setEditId(null)
      setName("")
    }else{
      const newItem = {id:Math.random(),title:name,}
      setList([...list,newItem])
      setName("")
      showAlert("Item Added","success",true)
    }
  }
  const showAlert = (msg="",type="",show=false)=>{
    setAlert({msg,type,show})
  }
  const handleClear =()=>{
    showAlert("No item has left",'danger',true)
    setList([])
  }
  const editItem = (id)=>{
    const newItem = list.find((item)=>item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(newItem.title)
  }
  const EditItem = ()=>{
    const Edited =list.map((item)=>{
      if(item.id === editId){
        return {...item,title:name}
      }
      return item;
  })
  return Edited;
  }
  const removeItem = (id)=>{
    const removedItem = list.filter(item=>item.id === id);
    const newItem = list.filter(item=>item.id !== id);
    showAlert(`${removedItem[0].title} this item has been removed`,'danger',true)
    setList(newItem)
  }
  const toLocalData =()=>{
    localStorage.setItem(LSData,JSON.stringify(list));
  }
  useEffect(()=>{
    toLocalData();
  },[list])
  return <section className="section-center">
    {alret.show && <Alert {...alret} showAlert={showAlert} />}
    <form className="grocery-form" onSubmit={handleSubmit}>
    <h3>GROCERY BUD</h3>
      <div className="form-control">
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="grocery" placeholder="e.g : bananas,apples" />
          <button className="submit-btn" >{isEditing?"Edit":"submit"}</button>

      </div>
    </form>
    {list.length > 0 && (
      <div className="grocery-container">
        <List list={list} removeItem={removeItem} editItem={editItem}/>
        <button onClick={handleClear} className="clear-btn">clear</button>
      </div>
    )}
  </section>
}

export default App
