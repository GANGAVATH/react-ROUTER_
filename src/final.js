console.log('suri');
import {createStore,combineReducers} from 'redux';
import uuid from 'uuid';


const postbook_book= ({
    title = '',
    description='',
     price =0,
     createAt = 0
}={})=> ({
  type : 'POST_BOOK',
  mainbooks :{
    id :uuid(),
    title,
    description,
    price,
    createAt
  }
})
const update_books = (id , update)=>({
  type : "UPDATE_BOOK",
  id,
  update
})

const remove_books =({id} = {})=>({
  type : "REMOVE_BOOK",
  id
})

const booksReducers =(state =[] ,action)=>{
  switch(action.type) {
    case "POST_BOOK":
    return [
      ...state,
      action.mainbooks
    ]
    // UPDATE 
    case 'UPDATE_BOOK':
    return state.map(books => {
      if(books.id === action.id){
        return {
          ...state,
          ...action.update
        }
      }else{
        return state
      }
    });
    case 'REMOVE_BOOK':
    return  state.filter(({id}) => id !== action.id)
    //deefatlt 
    default :
        return state ;
  }
}

// filterby text
 const byText =(text = '') =>({
   type : 'FILTER_TEXT',
   text
 })

//filter by amount
 const byAmount  = ()=>({
   type : "FILTER_AMOUNT"
 })
// filter by date 
const byDate = () =>({
  type :  'FILTER_DATE'
})

// filter start date
 const bystartDate =(startdate) =>({
   type : "FILTER_STARTDATE",
   startdate
 })
// filter end date 

const byendDate =( enddate) =>({
  type : "FILTER_ENDDATE",
  enddate
})


const defaultfilters = {
  text :'',
  sortBy:'date',
  startDate:undefined,
  enddate:undefined
}
const filterReducers =(state =defaultfilters,action) =>{
  switch(action.type) {
    case "FILTER_TEXT":
    return {
      ...state,
      text :action.text
    }
    case "FILTER_AMOUNT":
    return {
      ...state,
      sortBy :'amount'
    };
    case "FILTER_DATE":
    return {
      ...state,
      sortBy :'date'
    }
  
    case "FILTER_STARTDATE":
    return {
      ...state,
      startDate :action.startDate
    };

    case "FILTER_ENDDATE":
    return {
      ...state,
      endDate :action.endDate
    };
    //deefatlt 
    default :
        return state ;
  }
}
const getVisibleExpenses =(books,{ text,sortBy,startDate,endDate})=>{
  return books.filter((book) =>{
    const startdateMach = typeof startdate !== 'number' || book.createAt >= startDate ; 
    const endDateMach = typeof startdate !== 'number' || book.createAt <= endDate;
    const textMach = book.description.toLowerCase().includes(text.toLowerCase());
    return startdateMach && endDateMach && textMach
  }).sort((a,b) => {
       if(sortBy === 'date'){
         return a.createAt < b.createAt ? 1 : -1;
       }else if (sortBy === 'amount'){
        return a.price < b.price ? 1 : -1;

       }
  })
};
const store = createStore(combineReducers({
      books :booksReducers,
     filters :filterReducers
}))
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.books, state.filters);
  console.log(visibleExpenses);
});


const first_book = store.dispatch(postbook_book({
  title :'wordpress',
   description:'somthing',
   price:120,
   createAt :-20000 
  }))
//const second_book = store.dispatch(postbook_book({title : 'nodejs', description:'nodejssss',price:500,createAt : -1000}))


store.dispatch(byAmount());
//store.dispatch(byText('somthing'));


const demoBook ={
  books :[{
    id : 123,
    title : 'demo',
    description:'demo',
    price :0,
    createAt : 0
  }],
  filters : {
     text :'rent',
     sortBy:'date',
     startDate:undefined,
     endDate:undefined
  }
}