import { useEffect, useState } from "react";
import axios from "axios";

const initialFormPost = {
  title: "",
  description: "",
  category: "",
  image: "",
  available: false,
  tags: ""
};

const htmlApi = "http://localhost:3001";

function App() {


  const [posts, setPost] = useState([]) //array
  const [formData, setFormData] = useState(initialFormPost) //object

  //setto il useEffect in mounting nella creazione del componente App che fa la chiamata per prendere tutti i post
  useEffect(() => {
    getPosts();
  }, []);

  //questa è la funzione che fa la chiamata axsios per prendere i post
  const getPosts = () => {
    axios.get(`${htmlApi}/posts`).then((resp) => {
      //solo qui dentro ho la risposta della chiamata e quindi posso gestire i dati della api
      console.log(resp);
      setMenu(resp.data.post);
    });
  };


  //questa è la funzione di callback del submit del form
  const handleSubmitForm = (event) => {
    event.preventDefault();

    //qui faccio la chimata axios per creare il nuovo element nel backhand tenendo conto che l'id viene generato li
    axios.post(`${htmlApi}/posts`, formData).then((resp) => {
      console.log(resp);

      // 2 creo la copia dell'array posts precedente, aggiungendo il nuovo post
      const newArray = [...posts, resp.data];

      // 3. aggiorno lo stato dei posts
      setPost(newArray);

      // 4. Ripulisco i campi del form
      setFormData(initialFormData);
    });
  };


  //questa è la funzione di callback che cancella il post
  const handleDeliteButton = (idToDelite) => {
    axios.delete(`${htmlApi}/posts/${idToDelite}`).then((resp) => {
      const newArray = posts.filter(
        (curPost) => curPost.id !== idToDelite
      );
      setPosts(newArray);
    });
  };

  return (
    <>
    {/* parte del dom che stampa le card */}
      <section>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4">
            {posts.map((curPost) => (
              <div className="card" key={curPost.id}>
                <h4>{curPost.title}</h4>
                <p>{curPost.description}</p>
                <button className="btn btn-warning" onClick={() => handleDeliteButton(curPost.id)}>cancella</button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* da qui parte il form */}
      
      <section>
          <div className="container">
            <h2>Compila il post per aggiungere un nuovo post:</h2>

            {/* form */}
            <form onSubmit={handleSubmitForm}>


              {/* input del titolo */}
              <div className="my-2">
                <label htmlFor="formTitle" className="my-2">titolo del post:</label>
                <input type="text" name="title" id="formTitle" className="form-control" value={formData.title} onChange={handleImputChange} />
              </div>

              {/* input della descrizione */}
              <div className="my-2">
                <label htmlFor="formDescription" className="my-2">descrizione del post:</label>
                <textarea name="description" id="formDescription" className="form-control" value={formData.description} onChange={handleImputChange}></textarea>
              </div>

              {/* input dell'immagine */}
              <div className="my-2">
                <label htmlFor="formImage" className="my-2">metti quil'immagine del tuo post</label>
                <input type="text" name="image" id="formImage" className="form-control" value={formData.image} onChange={handleImputChange} />
              </div>

              {/* input della categoria */}
              <div className="my-2">
                <label htmlFor="formCategory" className="my-2">scegli la categoria del post</label>
                <select name="category" id="formCategory" className="form-control" onChange={handleImputChange} value={formData.category}>
                  <option value="categoria 0">-scegli categoria-</option>
                  <option value="categoria 1">categoria 1</option>
                  <option value="categoria 2">categoria 2</option>
                  <option value="categoria 3">categoria 3</option>
                </select>
              </div>

              <div className="my-2">
                <label htmlFor="aviableForm" >spunta il check se il post sara visualizzabile</label>
                <input type="checkbox" name="available" id="aviableForm" className="form-contol" checked={formData.available} onChange={handleImputChange} />
                {formData.available && <div>attenzione hai spuntato il check il tuo post cosi non sara visualizzato</div>}
              </div>
              <button className="btn btn-primary" type="submit">Invio</button>
            </form>
          </div>
        </section>
    </>
  )
}

export default App
