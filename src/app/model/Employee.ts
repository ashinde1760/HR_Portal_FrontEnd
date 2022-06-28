export interface Employee{

          id?:number,
          name?: string,
          designation?:string,
          email?:string;
          location?:string,
          department?:string,
          mobile?:string,
          username?:string,
          doj?:Date,
          dol?:Date,
          fileName?:string,
          review?:string,
          actionTaken?:string,
          permanentAddress?:string,
          currentAddress?:string,
          profilePic?:string
          detailsFilename?:string;
          reportingTo?:string
          
      }
    



export interface EmpLeave{
    id?:number,
    name?:string,
    totalCasualLeaves?:number,
    totalLeave?:number,
    totalEarnedLeaves?:number,
    totalSickLeaves?:number
         leaveList:[{
              name?:string,
              numberOfLeave?:number,
              fromDate:Date,
              toDate:Date,
              reason:string,
              comment: string,
              leavetype:string
                    
         }],

         


}


         
export interface Leaves{
     name?:string,
     numberOfLeave?:number,
     fromDate:Date,
     toDate:Date,
     reason:string,
     comment: string,
     leavetype:string
}


