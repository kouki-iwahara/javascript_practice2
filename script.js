'use strict';

(function () {
     const todos = [];

     // タスク追加に関する要素の取得
     const inputTodo = document.getElementById('input-todo');
     const addBtn = document.getElementById('add-btn');
     
     // todoリストに関する要素の取得
     const todoList = document.getElementById('todo-list');
     
     // ラジオボタンに関する要素の取得
     const workRadioBtn = document.getElementById('work-radio-btn');
     const compRadioBtn = document.getElementById('comp-radio-btn');

     // ラジオボタンで画面切り替えをする関数
     const disChange = (tr, switchBtn) => {    
          tr.classList.remove('hidden');
          if(workRadioBtn.checked === true) {
               tr.classList.remove('hidden');
               if(switchBtn.textContent === '完了') {
                    tr.classList.add('hidden');
               }
          }else if (compRadioBtn.checked === true) {
               tr.classList.remove('hidden');
               if(switchBtn.textContent === '作業中') {
                    tr.classList.add('hidden');
               }
          }
     }    
     
     // addBtnのclickイベント
     addBtn.addEventListener('click', (event) => {
          const todoComment = inputTodo.value; 
          const workBtn = document.createElement('button');
          // 作業中/完了ボタン作成, clickイベント→作業中/完了ボタンの切り替え
          workBtn.textContent = '作業中';
          workBtn.addEventListener('click', (event) => {
                    if(workBtn.textContent === '作業中') {
                         workBtn.textContent = '完了';
                    } else {
                         workBtn.textContent = '作業中';
                    }
               })

          // todoリストの内容、作業中ボタンの連想配列作成
          const todo = new Object();
           todo.value = todoComment;
           todo.state = workBtn;
     
          //空のまま追加されないように条件分岐
           if (todo.value && todo.value.match(/\S/g)) { 
               todos.push(todo); 
               showTodo();
               inputTodo.value = ''; 
          }
     });
     
     // todoリストを表示する関数
     const showTodo = () => {
          // 要素の中身を一度リセット（毎回追加されてしまうため）
          while(todoList.firstChild) {
               todoList.textContent = '';
          }
     
          todos.forEach((todo, index) => {
               const tr = document.createElement('tr');
               const idNum = document.createElement('td');
               const comment = document.createElement('td');
               const state = document.createElement('td');
               const del = document.createElement('td');
               
               idNum.textContent = index + 1; //htmlに表示するidナンバー
               comment.textContent = todo.value; //htmlに表示するコメント
               const switchBtn = todo.state; //obj'todo'のstateの値を代入
     
     
               // 削除ボタン作成
               const delBtn = document.createElement('button');
               delBtn.textContent = '削除';
     
               // 削除ボタンのclickイベント
               delBtn.addEventListener('click', (event) =>{
                    delTodo(index); //引数'index'で、idNumとcommentを紐付け
               })
     
               
               const disBtn = document.getElementsByName('disBtn');
               for(let i = 0; i < disBtn.length; i++) {
                    disBtn[i].addEventListener('change', function() {
                         disChange(tr, switchBtn);
                    });
               }
     
               // タスクが追加される前に発動させないと不具合発生
               disChange(tr, switchBtn);
               
               // 作成した要素をhtmlに表示
               todoList.appendChild(tr);
               tr.appendChild(idNum);
               tr.appendChild(comment);
               tr.appendChild(state);
               tr.appendChild(del);
               state.appendChild(switchBtn);
               del.appendChild(delBtn);
          });
     };
     // 削除ボタンの関数
     const delTodo = index => {
          todos.splice(index, 1);
          showTodo(); 
     }
}());