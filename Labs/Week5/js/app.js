Vue.component("student-card", {
    props: {
        student: Object,
        isactive: ['active', 'outright', 'outleft']
    },
template: "<div class='student' v-bind:class='{ cardActive:isactive, cardOutRight:!isactive, cardOutLeft:!isactive }'>{{ student.name }} <br> Skill: {{ student.skill }} <br> Joy: {{student.joy }}</div>"
})
 
var app = new Vue({
    el: "#app",
    data: {
        students: [
            { name: "Sienna", skill: 2, joy: 0 },
            { name: "Cyan", skill: 0, joy: 5 },
            { name: "Magenta", skill: 3, joy: 3 }
        ],
        currentStudent: { name: "Sienna", skill: 2, joy: 0 },
        curStudentId: 0,
        cardActive: true
    },
    methods: {
        arrowClickedLeft: function() {
            this.cardActive = !this.cardActive;

            setTimeout( () => {
                this.currentStudent.joy ++;

                if(this.curStudentId <= 0) {
                    this.curStudentId = this.students.length-1;
                } else {
                    this.curStudentId --;
                }

                //iteration code
                this.currentStudent = this.students[this.curStudentId];


                //animation trigger
                this.cardActive = !this.cardActive;
            }, 300);
        }, 
        arrowClickedRight: function() {
            
            this.cardActive = !this.cardActive;

            setTimeout( () => {
                //modify the skill of the current student
                //before moving onward:
                this.currentStudent.skill ++;

                //iteration code
                if(this.curStudentId >= this.students.length-1) {
                    this.curStudentId = 0;
                } else {
                    this.curStudentId ++;
                }
                this.currentStudent = this.students[this.curStudentId];

                //animation trigger
                this.cardActive = !this.cardActive; 
                
            }, 300);
        },
        enrollStudent: function() {
           
            //gather values from the form
            var newStudentForm = document.getElementById("frm1");
            var name = newStudentForm.elements[0].value;
            var skill = newStudentForm.elements[1].value;
            var joy = newStudentForm.elements[2].value;

            //create new student object with the returned values
            var newstudent = { name: name, skill, skill, joy, joy };

            //push new object to students array
            this.students.push(newstudent);

            //switch display to the new student
            this.curStudentId = this.students.length-1;
            this.currentStudent = this.students[this.curStudentId];

            //disaply the action to the page
            var studentLog = document.getElementById("studentLog");
            studentLog.innerHTML = this.currentStudent.name + " has been enrolled.";

        },
        expellStudent: function() {
            //remove current student from the array
            this.students.splice(this.currentStudent, 1);

            //disaply the action on the page
            var studentLog = document.getElementById("studentLog");
            studentLog.innerHTML = this.currentStudent.name + " has been expelled.";
            
        }
    }
})

