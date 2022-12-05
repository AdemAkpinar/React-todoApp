import React, { useState } from 'react';

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [degistirButonunaBasildiMi, setDegistirButonunaBasildiMi] = useState(false);
  const [guncellenecekText, setGuncellenecekText] = useState("");
  const [guncellenecekTodo, setGuncellenecekTodo] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("Boş bir değer kaydetmeye çalıştınız");
      return
    }

    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date(),
      hasDone: false
    }
    setTodos([...todos, newTodo]);
    setTodoText("");
  }

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(i => i.id !== id)
    setTodos(filteredTodos)
  }

  const changeHasDone = (todo) => {
    const tempTodos = [];
    todos.map((item) => {
      if (item.id === todo.id) {
        let updatedTodo = {
          ...todo,
          hasDone: !todo.hasDone
        }
        tempTodos.push(updatedTodo)
      } else {
        tempTodos.push(item)
      }
    })
    setTodos(tempTodos);
  }

  const todoGuncelle = (event) => {
    event.preventDefault()
    if (guncellenecekText === "") {
      alert("TodoText boş olamaz")
      return
    }
    const tempTodos = []
    todos.map(item => {
      if (item.id === guncellenecekTodo.id) {
        const updateTodo = {
          ...guncellenecekTodo,
          title: guncellenecekText
        }
        tempTodos.push(updateTodo)
      } else {
        tempTodos.push(item)
      }
    })
    setTodos(tempTodos)
    setDegistirButonunaBasildiMi(false)
  }

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input value={todoText}
            onChange={(event) => {
              setTodoText(event.target.value);
            }}
            type="text" className="form-control" placeholder="Yapılacak iş ekle..." aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button className="btn btn-primary">EKLE</button>
        </div>
      </form>

      {
        degistirButonunaBasildiMi === true && (
          <form onSubmit={todoGuncelle}>
            <div className='input-group mb-3'>
              <input value={guncellenecekText} onChange={(event => setGuncellenecekText(event.target.value))} className='form-control' type="text"></input>
              <button onClick={() => {
                setDegistirButonunaBasildiMi(false)
              }} className='btn btn-danger' type='button'>Kapat</button>
              <button className='btn btn-info' type='submit'>Kaydet</button>
            </div>
          </form>
        )
      }




      <div className='container'>
        {
          todos.length === 0 ? (
            <p>"Yapılacaklar Listeniz Boş"</p>
          ) : (
            <div >
              <div className='container' >
                {
                  todos.map((item, index) => (
                    <div key={index}
                      style={{ borderBottom: "1px solid gray" }}
                      className="flex justify-content-between align-items-center">
                      <div>
                        <h1 style={{ textDecoration: item.hasDone === true ? "line-through" : "none" }}
                        >{item.title}{" "}</h1>
                        <small>{new Date(item.date).toLocaleDateString()}</small>
                      </div>
                      <div>
                        <button onClick={() => { deleteTodo(item.id) }
                        } className='btn btn-sm btn-danger'>Sil</button>
                        <button onClick={() => {
                          setDegistirButonunaBasildiMi(true);
                          setGuncellenecekText(item.title);
                          setGuncellenecekTodo(item)
                        }} className='btn btn-sm btn-secondary'>Düzenle</button>
                        <button onClick={() => changeHasDone(item)} className='btn btn-sm btn-success'>{item.hasDone === false ? "Yapıldı" : "(Yapılmadı)"}</button>
                      </div>
                      <hr />
                    </div>

                  ))
                }
              </div>
            </div>

          )
        }
      </div>
    </div>
  );
}

export default App;
