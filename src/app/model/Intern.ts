export interface Intern{

    
          id?:number,
          name?: string,
          mentor?:string,
          location?:string,
          address?:string,
          mobile?:number,
          email?:string,
          projectname?:string,
          doj:Date,
          dol:Date;
          fileName:string,
          review:string,
          username:string,
          actionTaken:string,
          profilePic:string
         

      

}

// export interface Interndata{

    
//     id?:number,
//     name?: string,
//     mentor?:string,
//     location?:string,
//     address?:string,
//     mobile?:number,
//     email?:string,
//     projectname?:string,
//     userId:any



// }



export interface InternLeave{
    id?:number,
    name?:string,
    totalLeave?:number,
    leaveList?:[{
        name?:string,
        numberOfLeave?:number,
        fromDate:Date,
        toDate:Date,
        reason:string,
        comment: string,
        leavetype:string
              
   }],


}

