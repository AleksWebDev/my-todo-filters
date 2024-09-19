window.addEventListener('DOMContentLoaded', function(){
    const form = this.document.querySelector('.form');
    const input = this.document.querySelector('.input');

    const allData = [];

    form.addEventListener('submit', function(e){
        e.preventDefault();
        
        let id = 0;

        if(allData.length > 0){
            let currentTask = allData[allData.length - 1];
            console.log(currentTask);
            let currentId = currentTask.id;
            console.log(currentId);
            id = currentId += 1;
        }

        const task = {
            name: input.value,
            isChecked: false,
            id: id,
        }

        allData.push(task);
        input.value = '';

    })
})