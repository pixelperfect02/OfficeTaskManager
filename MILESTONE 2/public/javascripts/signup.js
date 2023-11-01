
function signUP() {
    window.location.href = "../login.html";
}
var vueinst = new Vue({
    el: "#vuemain",
    data: {

       message:'',
       fname: '',
       lname:'',
       email:'',
       password:'',
       gender:'',
       dob:'',
       info:''

        },
  methods: {

     isRegisteredUser : function(event)
     {
       this.message=this.fname+' '+this.lname+' '+this.email+' '+this.password+' '+this.dob+' '+this.gender;
       if(this.fname!='' && this.lname!='' && this.email!='' && this.password!='' && this.dob!='' && this.gender!='')
       {
            this.info='Registration is successful.';
       }
       else
       {
            this.info='Registration is unsuccessful.';
       }
     }


  }
  });

