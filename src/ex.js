import {createStore } from 'redux';

const incrementState =({incremnetby =1 } ={})=> ({
     type : 'INCREMENT',
     incremnetby
})
const decrementState =({decremnetby =1 } ={})=> ({
  type : 'DECREMENT',
  decremnetby
})


const store = createStore((state={count:1},action)=>{
  switch(action.type){
   case 'INCREMENT':
    return {
      count: state.count + action.incremnetby
            };
    break;
    case 'DECREMENT':
    return {
      count: state.count - action.decremnetby
    };

    return 
       state
  }
})

store.subscribe(()=>{
  console.log(store.getState())
})


store.dispatch(incrementState({incremnetby : 10}))
store.dispatch(incrementState({decremnetby : 20}))