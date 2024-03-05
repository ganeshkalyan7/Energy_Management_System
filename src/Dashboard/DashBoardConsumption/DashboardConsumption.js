import React from 'react'
  import rectangle112 from "../../images/rectangle-112.svg"
  import rectangle106 from "../../images/rectangle-106.svg"
  import rectangle107 from "../../images/rectangle-107.svg"
  import rectangle108 from "../../images/rectangle-108.svg"
  import rectangle109 from "../../images/rectangle-109.svg"
  import rectangle110 from "../../images/rectangle-110.svg"
  import rectangle111 from "../../images/rectangle-111.svg"
  import rectangle113 from "../../images/rectangle-113.svg"
  import rectangle114 from "../../images/rectangle-114.svg"
  import rectangle115 from "../../images/rectangle-115.svg"
  import './DashBoardConsumption.css'

  function DashboardConsumption() {


    return (
      <div className='mainDiv'>
          <div className='maincontainer'> 

          
          <div style={{position: "reltive", width: "102%", height: "700px",  fontSize: "16px", color: "#fff",}}> 
  <div style={{position: "relative", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#fff",width: "100%", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "100%", height: "700px",}}>
  <div style={{color:"black",fontSize:"20px",marginTop:"50px",position: "absolute",marginLeft:"40px",fontWeight:"700"}}>Consumption</div>
    <div style={{marginLeft:"5%"}}> 
 
   

  <span style={{border:"1px solid #f2f2f2",height:"400px",width:"1px",marginTop:"14%",marginLeft:"72px",position:"absolute"}}>
    <span style={{color:"black",marginLeft:"20px",fontSize:"15px",fontWeight:"700"}}> Clients </span>
    <br/> 
    <p style={{color:"gray",marginLeft:"20px",fontSize:"15px",fontWeight:"700",marginTop:"30px"}}> Total </p>

    <p style={{color:"black",marginLeft:"20px",fontSize:"15px",fontWeight:"700"}}>100(kWh)</p>
  </span>
  <span style={{border:"1px solid #f2f2f2",height:"400px",width:"0.5px",marginTop:"14%",marginLeft:"306px",position:"absolute"}}>
    
    <span style={{color:"black",marginLeft:"20px",fontSize:"15px",fontWeight:"700"}}> Chillers </span>
    <br/>
    <p style={{color:"gray",marginLeft:"20px",fontSize:"15px",fontWeight:"700",marginTop:"30px"}}> Total </p>
    <p style={{color:"black",marginLeft:"20px",fontSize:"15px",fontWeight:"700"}}>80(kWh)</p>
  </span>
  <span style={{border:"1px solid #f2f2f2",height:"370px",width:"0.5px",marginTop:"14%",marginLeft:"540px",position:"absolute"}}>
    
    <span style={{color:"black",marginLeft:"20px",fontSize:"15px",fontWeight:"700"}}>CommonArea</span> 
    <br/>
    <p style={{color:"gray",marginLeft:"20px",fontSize:"15px",fontWeight:"700",marginTop:"30px"}}> Total </p>
    <p style={{color:"black",marginLeft:"20px",fontSize:"15px",fontWeight:"700"}}>60(kWh)</p>
  
  
   </span>
  <span style={{border:"1px solid #f2f2f2",height:"370px",width:"0.5px",marginTop:"14%",marginLeft:"770px",position:"absolute"}}>
    
    <span style={{color:"black",marginLeft:"20px",fontSize:"15px",fontWeight:"700"}}> Others </span>
    <br/>
    <p style={{color:"gray",marginLeft:"20px",fontSize:"15px",fontWeight:"700",marginTop:"30px"}}> Total </p>
    <p style={{color:"black",marginLeft:"20px",fontSize:"15px",fontWeight:"700"}}>40(kWh)</p>
  
  
  </span>


  <img style={{position: "absolute", top: "498px", width: "40%", height: "62px",left: "57.5%",}} alt="" src={rectangle110} />

<img style={{position: "absolute", top: "479.2px", left: "48.5%", width: "245px", height: "96px",}} alt="" src={rectangle111} />
<img style={{position: "absolute", top: "453.5px", left: "30%", width: "236px", height: "140px",}} alt="" src={rectangle112} />
 <img style={{position: "absolute", top: "400.5px", left: "11%", width: "236px", height: "238px",}} alt="" src={rectangle113} />
 
 <img style={{position: "absolute", top: "510px", left: "67%", width: "236px", height: "39px",}} alt="" src={rectangle106} />

 <img style={{position: "absolute", top: "499px", left: "48.7%", width: "236px", height: "60px",}} alt="" src={rectangle107} />
<img style={{position: "absolute", top: "484px", left: "29.5%", width: "236px", height: "87px",}} alt="" src={rectangle108} />
 <img style={{position: "absolute", top: "450px", left: "11%", width: "236px", height: "148px",}} alt="" src={rectangle109}/>
          </div>
  </div>
  </div>
        </div>
      </div>
    )
  }

  export default DashboardConsumption



  //  <div style={{position: "absolute", top: "800px", left: "15%", width: "1047px", height: "372px",}}>

  //       {/* --------------- */}
  //       <div style={{position: "absolute", top: "0px", left: "16px", fontWeight: "600",}}>Clients</div>
  //       <div style={{position: "absolute", top: "57px", left: "16px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
  //       <div style={{position: "absolute", top: "57px", left: "252px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
  //       <div style={{position: "absolute", top: "57px", left: "488px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
  //       <div style={{position: "absolute", top: "57px", left: "724px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
  //       <div style={{position: "absolute", top: "0px", left: "252px", fontWeight: "600",}}>Utilities</div>
  //       <div style={{position: "absolute", top: "0px", left: "488px", fontWeight: "600",}}>Chillers</div>
  //       <div style={{position: "absolute", top: "0px", left: "724px", fontWeight: "600",}}>Others</div>
  //        <img style={{position: "absolute", top: "230px", width: "236px", height: "62px",left: "708px",}} alt="" src={rectangle110} />
  //        <img style={{position: "absolute", top: "248px", left: "944px", wxidth: "103px", height: "31px",}} alt="" src={rectangle115} /> 
  //       <img style={{position: "absolute", top: "213px", left: "472px", width: "236px", height: "96px",}} alt="" src={rectangle111} />
  //       <img style={{position: "absolute", top: "187px", left: "236px", width: "236px", height: "140px",}} alt="" src={rectangle112} />
  //        <img style={{position: "absolute", top: "134px", left: "0px", width: "236px", height: "238px",}} alt="" src={rectangle113} />
  //        <img style={{position: "absolute", top: "243px", left: "708px", width: "236px", height: "39px",}} alt="" src={rectangle106} />
  //        <img style={{position: "absolute", top: "254px", left: "944px", width: "103px", height: "19px",}} alt="" src={rectangle114} />
  //        <img style={{position: "absolute", top: "232px", left: "472px", width: "236px", height: "60px",}} alt="" src={rectangle107} />
  //        <img style={{position: "absolute", top: "216px", left: "236px", width: "236px", height: "87px",}} alt="" src={rectangle108} />
  //        <img style={{position: "absolute", top: "183px", left: "0px", width: "236px", height: "148px",}} alt="" src={rectangle109}/>

         
  //       <div style={{position: "absolute", top: "34px", left: "16px", color: "#5a5a5a",}}>Total</div>
  //       <div style={{position: "absolute", top: "34px", left: "252px", color: "#5a5a5a",}}>Total</div>
  //       <div style={{position: "absolute", top: "34px", left: "488px", color: "#5a5a5a",}}>Total</div>
  //       <div style={{position: "absolute", top: "34px", left: "724px",}}>Total</div>
  //     </div>