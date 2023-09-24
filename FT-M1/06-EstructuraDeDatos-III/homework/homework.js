'use strict';

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)
  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/
function BinarySearchTree(value = null) {
   this.value = value;
   this.left = null;
   this.right = null;
   
   this.size = () => {
      let size = 0;
      
      if (this.value !== null) size = 1;
      if (this.left) size += this.left.size();
      if (this.right) size += this.right.size();    
        
      return size;
   };
   
   this.insert = (value) => {
      if (this.value === null) this.value = value;
      
      else if (value <= this.value) {
         if (this.left === null) this.left = new BinarySearchTree();
         this.left.insert(value);
      } 
      else {
         if (this.right === null) this.right = new BinarySearchTree();
         this.right.insert(value);
      }
   };
   
   this.contains = (value) => {
      if (this.value === null) return false;
      if (this.value === value) return true;

      else if (value < this.value) {
         if (this.left === null) return false;
         else return this.left.contains(value);         
      }
      else {
         if (this.right === null) return false;
         else return this.right.contains(value);         
      }
   };
   
   this.depthFirstForEach = (cb, order = 'in-order') => {      
      if (order === 'pre-order') cb(this.value);      

      if (this.left) this.left.depthFirstForEach(cb, order);
      if (order === 'in-order') cb(this.value);
      
      if (this.right) this.right.depthFirstForEach(cb, order);
      if (order === 'post-order') cb(this.value);      
   };
   
   this.breadthFirstForEach = (cb) => {
      const queue = [this];
      
      while (queue.length > 0) {
         const node = queue.shift();

         if (node.value !== null) cb(node.value);
         if (node.left) queue.push(node.left);
         if (node.right) queue.push(node.right);         
      }
   };
}

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
   BinarySearchTree,
};
