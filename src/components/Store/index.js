import { createStore } from 'redux';


const cardViewYes = ( state = {viewCard : false} , action) => {
    if(action.type === 'CARDVIEW'){
        return {
            viewCard : true,
        };
    }
    if(action.type === 'TABLEVIEW'){
        return {
            viewCard : false,
        };
    }

    return state;
}

const deleteUser = (state = {deleteuserId : false} , action) => {
    if(action.type === 'DELETEUSER'){
        return {
            deleteuserId : !(state)
        };
    }

    return state;
}


const storeCard = createStore(cardViewYes);
const storeDeleteUser = createStore(deleteUser)

export  {storeCard,storeDeleteUser};