// classe Todo 
// modella un oggetto todo composto da:
// - content (il contenuto testuale del todo), 
// - id(univoco per la todo)
// - type che può assumere valori checked ed unchecked
class Todo{
    content; 

    constructor(content, type, id){
        this.content=content;
        this.type=type;
        this.id=id;
    }
    // stampa l'oggetto todo nella pagina
    print(){
        // il contenitore html del todo (l'ul)
        let container=$(".unchecked-list");

        // creazione del contenitore del todo e lo si appende al contenitore del todo(il li)
        let containerTodo=$(document.createElement('li')).appendTo(container);

        // creazione dell'elemento input di tipo checkbox
        // prende l'id uguale a quello dell'oggetto todo
        let checkbox=$(document.createElement('input')).attr({
            'type': 'checkbox',
            'id': 'input-' + this.id
        })
        .on("change", checking) // EventListener per poter checkare il bottone
        .appendTo(containerTodo); // appendo l'input al contenitore del todo(il li)

        // se il todo è di tipo checked l'input checkbox sarà checkato
        if(this.type=="checked"){
            checkbox.attr("checked", "checked");
        }
      
        // creazione dell'elemento label
        // il for sarà uguale a quello dell' input di tipo checkbox
        let label=$(document.createElement('label')).attr('for', 'input-'+ this.id);

        // se l'oggetto todo è di tipo checked allora la label avrà classe "is-checked"
        if(this.type==="checked"){ //se il tipo dell'oggetto è checked, allora assegno alla label la classe is-checked
            label.addClass("is-checked");
        }
        
        label.appendTo(containerTodo) // label appesa al contenitore della todo
        .text(this.content); // come testo la label avrà il content dell'oggetto todo(il testo del todo)
    
        // elemento di tipo button (che avrà l'icona X)
        let buttonTodo=$(document.createElement('button')).attr({
            'type': 'button',
            'id': 'icons'
        })
        .on("click", removeTodo) // EventListener per rimuovere la todo dall'elenco
        .addClass('btn btn-outline-light')
        .appendTo(containerTodo); // appendo al contenitore della todo

        // elemento svg del buttone X(per delete del todo)
        let svgMod=$(document.createElementNS("http://www.w3.org/2000/svg",'svg')).attr({
            "height": "16",
            "width": "16",
            "fill": "currentColor",
            "viewBox": "0 0 16 16"
        })
        .addClass('bi bi-x')
        .appendTo(buttonTodo); //appendo l'elemento svg al bottone

        // elemento path che andrà dentro l'svg contenuto nel bottone
        let path=$(document.createElementNS("http://www.w3.org/2000/svg",'path'))
        .attr( 'd', 'M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z')
        .appendTo(svgMod); //appendo il path all'SVG contenuto nel bottone

        // bottone che conterrà l'icona di modifica
        let buttonTodoOne=$(document.createElement('button'))
        .attr({
            'type': 'button',
            'id': 'icons'
        })
        .on("click", editTodo) // EventListener per la modifica del todo
        .addClass('btn btn-outline-light')
        .appendTo(containerTodo); //appendo il bottone al contenitore della todo

        // elemento svg del bottone di modifica
        let svgModOne=$(document.createElementNS("http://www.w3.org/2000/svg",'svg'))
        .attr({
            "height": "16",
            "width": "16",
            "fill": "currentColor",
            "viewBox": "0 0 16 16"
        })
        .addClass('bi bi-pencil')
        .appendTo(buttonTodoOne); //appendo l'svg al bottone di modifica

        // path per icona del bottone di modifica
        let pathOne=$(document.createElementNS("http://www.w3.org/2000/svg",'path'))
        .attr( 'd', 'M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z')
        .appendTo(svgModOne); //appendo il path all'elemento svg che si trova dentro il bottone di modifica
     
    }    

}


let todoList=[]; // array che conterrà gli oggetti todo

let dynamicId=0; // variabile globale per gli id dinamici

// se il localStorage è vuoto allora l'array dei todo sarà vuoto
// altrimenti recupera i dati dal localStorage
if(!localStorage.getItem("data")){
    todoList=[];
}
else{
    // il localStorage restituisce un array di dizionari
    let Arraydict= JSON.parse(localStorage.data);
    // per ogni dizionario si leggono i dati e si crea il nuovo oggetto todo, 
    // che viene inserito nell'array degli oggetti todo
    Arraydict.forEach(dict => {
        let todo = new Todo(dict.content,dict.type,dict.id);
        todoList.push(todo);
    });
    // stampa di tutti gli oggetti todo
    printTodos();
}


$(".insert-btn").on("click", insertTodo); // eventListener per l'inserimento di una nuova todo
$("#text-todo-add").on("keypress", insertTodoEnter); // eventListener per l'inserimento di una nuova todo (con tasto invio)

$("#check-all-btn").on("click", checkAll); // bottone per settare a checked tutti i todo

$("#all-unchecked-btn").on("click", uncheckAll); // bottone per settare ad unchecked tutti i todo

$("#delete-all-btn").on("click", clearAll); // cancella tutti i todo

$("#clear-checked-btn").on("click", clearChecked); // cancella tutti i todo che sono checked

$("[type='checkbox']").on("change", checking); // bottone del singolo todo per cambiare lo stato del todo in checked o unchecked

$(".select-all").on("click",printTodos); // mostra a schermo tutti i todo

$(".select-active").on("click", printActive); // mostra a schermo i todo unchecked

$(".select-completed").on("click", printCompleted); // mostra a schermo i todo checked

// per iserimento di una nuova todo
function insertTodo(){
    // prende i dati dall' input, 
    // crea un oggetto todo e lo aggiunge all'array, 
    // aggiorna il localStorage

    let textTodo=$("#text-todo-add"); // input in cui è inserito il testo della nuova todo
    let testoInput=(textTodo[0].value); // il testo inserito nell'input
    
    // solo se il testo non è vuoto
    if(testoInput!==""){
        // oggetto todo, con content = al testo inserito nell'input ed id dinamico
        let newTodo=new Todo(testoInput, "unchecked", createNewId());
        newTodo.print(); // stampo il singolo oggetto todo nella pagina
        todoList.push(newTodo); //inserito nell'array todoList l'oggetto Todo
        localStorage.setItem("data",JSON.stringify(todoList)); // aggiornamento del localStorage
        textTodo.val(""); // il testo dell'input viene resettato
    }
    
}

// se nell'input si preme il tasto invio parte l'inserimento
function insertTodoEnter(e){
    if (e.keyCode === 13){
        insertTodo();
    }
}

// imposta tutte le todo come checked
function checkAll(){
    // per ogni todo nell'array todo ne cambia il tipo a checked
    todoList.forEach(todo => {
        todo.type="checked";

    });
    localStorage.setItem("data", JSON.stringify(todoList)); // aggiornamento localStorage
    printTodos(); // stampa nuovamente tutti i todo
}

// imposta tutte le todo come unchecked
function uncheckAll(){
    // per ogni todo nell'array todo ne cambia il tipo ad unchecked
    todoList.forEach(todo => {
        todo.type="unchecked";
    });
    localStorage.setItem("data", JSON.stringify(todoList)); // aggiornamento localStorage
    printTodos(); // stampa nuovamente tutti i todo
}

// cancella tutti i todo
function clearAll(){
    todoList=[]; // imposta l'array dei todo a vuoto
    localStorage.setItem("data", JSON.stringify(todoList)); // aggiornamento dei todo
    printTodos(); // stampa nuovamente tutti i todo(chiamata solamente perchè pulisce)
}

// cancella tutti i todo checked 
function clearChecked(){
    // array che conterrà tutti i todo checked
    let arrayChecked=[];
    // per ogni todo, se di tipo checked allora lo si inserisce in array checked
    todoList.forEach(todo => {
        if(todo.type=="checked"){
            arrayChecked.push(todo);
        }
    });

    // si sottrae l'array dei todo checked dall'array di tutti i todo
    todoList = todoList.filter(todo => !arrayChecked.includes(todo));

    localStorage.setItem("data", JSON.stringify(todoList)); // aggiornamento del localStorage
    printTodos(); // print di tutti i todo
}

// imposta a checked ed unchecked un todo
function checking(){

    // se l'input è checked, 
    if ($(this).is(":checked")) {

        // seleziona la label con for uguale all'id dell'input e gli si assegna la classe "is-checked"
        $(`li > label[for='${this.id}']`).addClass("is-checked");

        // imposto il tipo checked all' oggetto todo corrispondente
        todoList.forEach(todo => {
            if(todo.id==this.id.substring(6)){
                todo.type="checked";
            }
        });
       
    } 
    else{ 
        
        // seleziono la label e rimuovo la classe "is-checked"
        $(`li > label[for='${this.id}']`).removeClass("is-checked");

        // imposto il tipo unchecked all' oggetto todo corrispondente
        todoList.forEach(todo => {
            if(todo.id==this.id.substring(6)){
                todo.type="unchecked";
            }
        });

    } 
    
    localStorage.setItem("data",JSON.stringify(todoList)); // aggiornamento del localStorage
}

// stampa tutti gli oggetti todo presenti nell'array todoList
function printTodos(){
    // pulisco la pagina prima di stampare
    $(".unchecked-list").html("");

    // per ogni todo ne si chiama il metodo print
    todoList.forEach(todo => {
        todo.print();       
    });
}

// mostra a schermo solo i todo unchecked
function printActive(){
    
    $(".unchecked-list").html(""); // si pulisce la pagina

    // per ogni todo che ha il tipo unchecked si stampa il todo
    todoList.forEach(todo => {
        if(todo.type=="unchecked"){
            todo.print();   
        }
    });
}

// mostra a schermo solo i todo checked
function printCompleted(){

    $(".unchecked-list").html(""); // si pulisce la pagina

    // per ogni todo che ha il tipo checked si stampa il todo
    todoList.forEach(todo => {
        if(todo.type=="checked"){
            todo.print();   
        }
    });
}

// permette di rimuover la todo tramite il pulsante x della todo
function removeTodo(){

    $(this).parent().remove(); // rimuove il contenitore della todo

    // prende id del todo da rimuovere dal campo for della label
    let removeId= $(this).prev().prop("for").substring(6);

    //  cerca indice todo da rimuovere
    let indexTodo;
    todoList.forEach(todo => {
        if(todo.id==removeId){
            indexTodo=todoList.indexOf(todo);
        }
    });

    // rimuove todo con indice selezionato
    todoList.splice(indexTodo, 1);
    
    localStorage.setItem("data",JSON.stringify(todoList)); // aggiorna il localStorage

}

// per modificare il contenuto della todo
function editTodo(){
    
    // label presente nella stessa todo in cui si trova il pulsante
    let label=$(this).prev().prev();

    // controlla se la label ha figli, se true allora l'input per la modifica esiste già
    // si deve perciò ripristinare la todo, la modifica è stata annullata
    if(label.children().length!=0){
        
        // la parte finale del for l'id del todo da ripristinare
        let idLabel=$(label).attr('for').substring(6); 
   
        let todoContent=""; // conterrà il contenuto del todo da ripristinare

        // si scorre la lista e si confronta per id per recuperare il contenuto del todo da ripristinare
        todoList.forEach(todo => {

            //se l'id dell'oggetto corrisponde alla parte estratta dell'attributo for della label..
            if(todo.id==idLabel){
                
                // allora il contenuto della todo, corrisponde al content dell'oggetto Todo
                todoContent=todo.content;
            }
        });

        // si rimuove l'input per la modifica del todo
        label.children().remove();

        // si ripristina il contenuto della todo
        $(label).text(todoContent); 

        // si ricambia il tasto della todo in tasto di modifica (elimino la freccia)
        $(this).children().attr("class", "bi bi-pencil");
        $(this).children().children().attr({
            "d":"M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z",
            "fill-rule": "nonzero"
        });
    }else{

        // la label non ha figli perciò si deve impostare l'ambiente per la modifica della todo
    
        label.text(""); //elimino il contenuto della label(il todo)

        //creo un nuovo elemento di input in cui poter inserire il nuovo potenziale testo della todo
        let inputModifica=$(document.createElement("input"))
        .attr({type: "text", placeholder: "inserisci qui la tua modifica"})
        .addClass("input-di-modifica")
        .on("keypress", doEdit); // EventListener per rendere effettiva la modifica

        label.append(inputModifica); //appendo l'input di modifica alla label

        //seleziono l'svg del pulsante, e lo modifico per poter cambiare l'icona nella freccia
        $(this).children().attr("class", "bi bi-arrow-left"); 
        
        //modifico il path per inserire l'icona della freccia che appare non appena premo sul pulsante di modifica
        $(this).children().children().attr({ 
            "fill-rule": "evenodd",
            "d":"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        });
    }

}

// per attualizzare la modifica della todo alla premuta del tasto invio
function doEdit(e){

    //se il tasto premuto è uguale al tasto di invio si attualizza la modifica
    if (e.keyCode === 13) { 

        //rimodifico il bottone, in modo tale che possa riapparire il pulsante di modifica
        let bottone=$(this).parent().next().next(); 
        $(bottone).children().attr("class", "bi bi-pencil"); 
        $(bottone).children().children().attr({
            "fill-rule": "nonzero",
            "d":"M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
        });
        
        let textEdit=($(this).val()); // il valore testo inserito nell'input

        let idObjEdit=$(this).parent().attr("for").substring(6); // l'id dell'oggetto todo il quale content è da modificare

        // si cerca nella lista di oggetti todo l'oggetto con l'id corrispondente per modificarne il content
        todoList.forEach(todo => {
            //se l'id dell'oggetto todo corrisponde all'attributo for estratto dalla label
            if(todo.id==idObjEdit){ 
                todo.content=textEdit; //il content dell'oggetto todo, sarà uguale al nuovo testo inserito
            }         
        });
        
        // la label conterrà il contenuto del testo modificato
        $(this).parent().text(textEdit);
        
        $(this).remove(); // rimuove l'input

        localStorage.setItem("data",JSON.stringify(todoList)); // aggiornamento del localStorage
       
      }
}

// per generare id dinamici
function createNewId(){
    // quando l'array è vuoto gli id dinamici ripartono da zero
    if(todoList.length==0){
        dynamicId=0;
    }
    return dynamicId++;
}