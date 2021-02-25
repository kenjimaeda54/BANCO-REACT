import React, { Component } from 'react';
import firebase from 'firebase';

class App extends Component{
  constructor(props){
    super(props);
      this.state={
       token:"carregando...",
       nome:"",
       nome1:"",
       idade1:""
      }
        let firebaseConfig = {
        apiKey: "AIzaSyAhMDu2fkhx607Y-4aFfX7mrf9iJ81I00M",
        authDomain: "reactudemy-24d1f.firebaseapp.com",
        databaseURL: "https://reactudemy-24d1f-default-rtdb.firebaseio.com",
        projectId: "reactudemy-24d1f",
        storageBucket: "reactudemy-24d1f.appspot.com",
        messagingSenderId: "768025376357",
        appId: "1:768025376357:web:99c5c87fe90cdd99abf88c"
      };
        // Initialize Firebase
        if (!firebase.apps.length) {      
        firebase.initializeApp(firebaseConfig);}

      /*
      on é o metodo de olheiro assim que atualizar no banco de dados
      atualiza aqui,cuidado com letra maisculo no banco de dados ,a forma
      que estiver escrito no dada base tem que estar identico  no 
      ".ref('Token')"
      firebase.database().ref('Token').on('value',((snapshot)=>{
               let estado = this.state;
               estado.token = snapshot.val();
               this.setState(estado);
      }))
      */
     //once atualiza so quando a pagina da produção atualizar caso acontrario
     //mesmo banco de dados mudando não muda
     firebase.database().ref('Token').once('value').then((snapshot)=>{
               let estado = this.state;
               estado.token = snapshot.val();
               this.setState(estado);
     })
     firebase.database().ref('Usuarios').child(1).on('value',(snapshot)=>{
              let estado1 = this.state;
              estado1.nome = snapshot.val().nome;
              this.setState(estado1); 
     }) 
     firebase.database().ref('Usuarios').child(2).once('value').then((snapshot)=>{
              let estado2 = this.state;
              estado2.nome1 = snapshot.val().nome;
               //referencia desta sintaxe com a sintaxe no render
              // esta no estado.nome== este nome é a sintaxe em baixo {nome},
              // se for nome1 sera estado.nome1;
              estado2.idade1 = snapshot.val().idade;
              this.setState(estado2);
     })    
  
   }    
  render(){
    const{token,nome,nome1,idade1} = this.state;
    return(
      <div>
       <h1>Token:{token}</h1>
       <h3>Nome:{nome}<br/>
           Segundo usuario Nome:{nome1}<br/>
           Sua idade:{idade1}
       </h3>
      </div>
    );
  }
}


export default App;
