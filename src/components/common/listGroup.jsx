import React from 'react';
  
const ListGroup = ({items, textProperty, valueProperty, onItemSelect, selectedItem}) => {


    return <ul className="list-group">
            
             {items.map(g => 
               <li className={g === selectedItem ? "list-group-item active" : "list-group-item"} 
                   onClick={() => onItemSelect(g)} 
                   key={g[valueProperty]}>{g[textProperty]}
               </li>)}
           </ul>;
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}
 
export default ListGroup;