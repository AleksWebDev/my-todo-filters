window.addEventListener('DOMContentLoaded', function(){
    const form = this.document.querySelector('.form');
    const input = this.document.querySelector('.input');
    const container = this.document.querySelector('.container');

    let allData = [];

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
    })
    //render task
    function render(allData){
        container.innerHTML = ' ';

        allData.forEach((elem, index) => {
            container.innerHTML += `
            <div class="task" data-id="${elem.id}">
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
        }

        if(e.target.classList.contains('task-check')){
            const id = Number(e.target.parentNode.dataset.id);
            const targetId = allData.findIndex(item => {
                if(item.id === id){
                    return true;
                }
            })
            allData[id].isChecked = e.target.checked;

            const activeTask = [];
            const complitedTask = [];

            render(allData.sort((a,b) => {return a.isChecked - b.isChecked}));
        }
    })

    
})
