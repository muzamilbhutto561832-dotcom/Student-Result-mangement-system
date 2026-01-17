let students=[];
function calculatepercentage(subjects){
    let marks = Object.values(subjects);
    let total = marks.reduce((sum,m) => sum + m,0);
    return (total / (marks.length * 100)) * 100;
}

document.getElementById("ADD").addEventListener("click", () => {
    addOrUpdateStudent();
    renderStuents();

});

function addOrUpdateStudent(){
    let name = document.getElementById("Student-Name").value;

    let subjects = {
        English: Number(document.getElementById("English").value),
        Math: Number(document.getElementById("Math").value),
        Sindhi: Number(document.getElementById("Sindhi").value),
    };


    let percentage = calculatepercentage(subjects);

    let exitstingStudent = students.find(s => s.name === name);

   if(exitstingStudent){
    exitstingStudent.subjects = subjects;
    exitstingStudent.percentage = percentage;
   }else{
    students.push({
        id: Date.now(),
        name,
        subjects,
        percentage,

    });
   }

   document.getElementById("Student-Name").value = "";
   document.getElementById("English").value = "";
   document.getElementById("Math").value = "";
   document.getElementById("Sindhi").value = "";

}

document.getElementById("Student-Name").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addOrUpdateStudent();
        renderStuents();
    }
});


function renderStuents(){
    let list = document.getElementById("studentlist");
    list.innerHTML="";
   students.forEach(student=>{

    let li= document.createElement("h2");
    let subjectDetails= Object.entries(student.subjects)
    .map(([sub,marks]) =>`${sub}:${marks}`)
    .join(" | ");
    li.innerHTML=` 
    <p id="p">${student.name}</p>
    <div id="div1">
    ${subjectDetails}<br> 
    percentage:${student.percentage.toFixed(2)} %
    <br>
    <button id="btn" onclick="deleteStudent(${student.id})">Delete</button> </div>
    `;
  list.appendChild(li);
});

}
function deleteStudent(id){
    students = students.filter(student => student.id !== id);

    
    renderStuents();
}
