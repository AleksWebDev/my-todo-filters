window.addEventListener('DOMContentLoaded', function(){
    const form = this.document.querySelector('.form');
    const input = this.document.querySelector('.input');
    const container = this.document.querySelector('.container');
    const searchForm = this.document.querySelector('.search-task');
    const select = this.document.querySelector('.select');

    let allData = JSON.parse(localStorage.getItem('task')) || [];

    function saveToLS(){
        localStorage.setItem('task', JSON.stringify(allData));
    }

    render(allData);

    form.addEventListener('submit', function(e){
        e.preventDefault();

        //id calculation for every task
        let id = 0;
        if(allData.length > 0){
            let currentTask = allData[allData.length - 1];
            let currentId = currentTask.id;
            id = currentId += 1;
        }
        //getting value from input and adding data to allData
        const task = {
            name: input.value,
            isChecked: false,
            status: 'active',
            id: id,
        }
        allData.push(task);
        input.value = '';
        render(allData);
        saveToLS();
    })

    //render task
    function render(allData){
        container.innerHTML = ' ';
        
        allData.forEach((elem, index) => {
            container.innerHTML += `
            <div class="task ${elem.isChecked ? 'done' : ''}" data-id="${elem.id}">
                <span class="task-id">${elem.id}</span>
                <div class="task-name">${elem.name}</div>
                <input type="checkbox" ${elem.isChecked ? 'checked' : ''} class="task-check">
                <button data-id="${elem.id}" class="task-delete">Delete</button>
            </div>
            `
        });

    }
    
    container.addEventListener('click', function(e){
        //deleting task
        if(e.target.classList.contains('task-delete')){
            const id = Number(e.target.dataset.id);

            const targetId = allData.findIndex(function(item){
                if(item.id === id){
                    return true;
                }
            })

            allData.splice(targetId, 1)
            render(allData);
            saveToLS();
        }
        //sorting tasks
        if(e.target.classList.contains('task-check')){
            const id = Number(e.target.parentNode.dataset.id);
            const targetElem = e.target.parentNode;

            const targetId = allData.findIndex(item => {
                if(item.id === id){
                    return true;
                }
            })

            allData[targetId].isChecked = e.target.checked;

            if(allData[targetId].isChecked){
                allData[targetId].status = !allData[targetId].status;
            }

            render(allData.sort((a,b) => {return a.isChecked - b.isChecked}));
            saveToLS();
        }
    })

    searchForm.addEventListener('keyup', function(e){
        const targetText = e.target.value.toLowerCase();
        const allTask = document.querySelectorAll('.task');
        
        allTask.forEach(item =>{
            const itemText = item.childNodes[3].textContent.toLowerCase();
            console.log(itemText.indexOf(targetText));
            if(itemText.indexOf(targetText) != -1){
                item.style.display = 'flex';
            }else{
                item.style.display = 'none';
            }
        })
    })

    select.addEventListener('click', function(e){
        const selectValue = e.target.value;
        const allTask = container.querySelectorAll('.task')
        
        let targets = allData.filter(item => {
            switch(selectValue){
                case 'all' : 
                return item;
                case 'complited' :
                return item.isChecked
                case 'active' : 
                return !item.isChecked
            }
        })

        render(targets);
        saveToLS();
    })
})
