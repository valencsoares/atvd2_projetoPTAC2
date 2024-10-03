import Menu from "./componentes/Menu.jsx";
import Navbar from "./componentes/navbar.jsx";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Cadastrar(){
    const listaVideosSalva = JSON.parse(localStorage.getItem("ListaVideos"))|| [];   
    const [listaVideos, setListaVideos] = useState(listaVideosSalva);
    const [url, setURL] = useState("");
    const [canal, setCanal] = useState("");
    const [tempo, setTempo] = useState("");
    const [data, setData] = useState("");
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [id, setId] = useState(listaVideosSalva [listaVideosSalva.length - 1]?.id + 1 || 1);
    /* estados */

    useEffect(() => { localStorage.setItem("ListaVideos", JSON.stringify(listaVideos)) }, [listaVideos]);
    const navigate = useNavigate();

    const salvar = async (e) =>{
        e.preventDefault(); //não recarregar a página
        await setListaVideos([...listaVideos, { //"..." serve para pegar tudo que tem na lista e add algo a mais
            url:url, canal:canal, tempo:tempo, data:data, titulo:titulo, descricao:descricao, id:id
        }]); 
        //para fazer com que apague as informações do input quando chamar a função
        setURL("")
        setCanal("")
        setTempo("")
        setData("")
        setTitulo("")
        setDescricao("")
        setId(id + 1)
        navigate("/") //acionar a pagina da home
    };

    return(
        <div className="container">
            <Navbar/>
            <Menu/>
        <div className="cadastro">
            <h1 className="texto">Cadastre quantos videos quiser!</h1>
            <form onSubmit={salvar}>
                <div className="barras">
                    <input placeholder="adicione o nome do canal do vídeo" type="text" value={canal} onChange={(e)=>{setCanal(e.target.value)}}/>
                    <input placeholder="adicione a url do vídeo" type="text" value={url} onChange={(e)=>{setURL(e.target.value)}}/>
                    <input placeholder="adicione o título" type="text" value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}/>
                    <input placeholder="adicione a descrição" type="text" value={descricao} onChange={(e)=>{setDescricao(e.target.value)}}/>
                    <input placeholder="adicione o tempo de duração do vídeo (99:99:99)" type="text" value={tempo} onChange={(e)=>{setTempo(e.target.value)}}/>
                    <input placeholder="adicione a data de publicação do vídeo (99/99/9999)" type="text" value={data} onChange={(e)=>{setData(e.target.value)}}/>
                </div>
                <div>
                    <button className="add">Cadastrar</button>
                </div>    
            </form>
        </div>
    </div>
)}