import React from 'react'
import DashboardPage1 from './DashBoardTopLayer/DashboardPage1'
import DashBoardSecoundLayer from './DashboardSecoundLayer/DashBoardSecoundLayer'
import DashboardPage2 from './DashboardPage2'
import New from './New'
import DashBoardChillers from './DashBoardChillers/DashBoardChillers'
import HotWaterTS from './DashBoardFourthPage/HotWaterTS'



function DashBoardCombine() {
  return (
    <div>
      {/* <DashboardPage1/>
      <DashBoardSecoundLayer/>
      
      <DashBoardChillers/>
      <HotWaterTS/> */}
      
   
      <div style={{width: "100%", position: "relative", backgroundColor: "#fafafa", height: "3703px", overflowX: "auto", textAlign: "left", fontSize: "14px", color: "#2b2b2b", fontFamily: "Poppins",}}>
      <div style={{position: "absolute", top: "99px", left: "0px", backgroundColor: "#fff", width: "294px", height: "3604px",}} />
      <div style={{position: "absolute", top: "0px", left: "0px", backgroundColor: "#fff", width: "1440px", height: "118px",}} />
      <div style={{position: "absolute", top: "172px", left: "13px", borderRadius: "100px", backgroundColor: "#69b931", width: "242px", height: "60px", opacity: "0.2",}} />
      <img style={{position: "absolute", top: "35px", left: "1278px", width: "53px", height: "53px", objectFit: "cover",}} alt="" src="/image001-1@2x.png" />
      <b style={{position: "absolute", top: "156px", left: "339px", fontSize: "24px",}}>Home</b>
      <b style={{position: "absolute", top: "138px", left: "38px", fontSize: "12px",}}>Menu</b>
      <b style={{position: "absolute", top: "193px", left: "81px", color: "#18822d",}}>Dashboard</b>
      <b style={{position: "absolute", top: "266px", left: "81px", color: "#adadad",}}>Analytics</b>
      <b style={{position: "absolute", top: "339px", left: "81px", color: "#adadad",}}>Alerts</b>
      <b style={{position: "absolute", top: "412px", left: "81px", color: "#adadad",}}>Controls</b>
      <b style={{position: "absolute", top: "486px", left: "81px", color: "#adadad",}}>Documentation</b>
      <img style={{position: "absolute", top: "187px", left: "36px", width: "30px", height: "30px", overflow: "hidden",}} alt="" src="/icrounddashboard.svg" />
      <img style={{position: "absolute", top: "260px", left: "36px", width: "30px", height: "30px", overflow: "hidden",}} alt="" src="/majesticonsanalytics.svg" />
      <img style={{position: "absolute", top: "333px", left: "36px", width: "30px", height: "30px", overflow: "hidden",}} alt="" src="/mdialertbox.svg" />
      <img style={{position: "absolute", top: "406px", left: "36px", width: "30px", height: "30px", overflow: "hidden",}} alt="" src="/antdesigncontrolfilled.svg" />
      <img style={{position: "absolute", top: "480px", left: "36px", width: "30px", height: "30px", overflow: "hidden",}} alt="" src="/basildocumentsolid.svg" />
      {/* -------- */}
      <div style={{position: "absolute", top: "297px", left: "309px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "748px", height: "134px",}} />
      <div style={{position: "absolute", top: "315px", left: "340px", fontSize: "16px", fontWeight: "600",}}>Facility</div>
      <div style={{position: "absolute", top: "364px", left: "340px", fontSize: "16px", lineHeight: "24px", fontWeight: "600", display: "inline-block", width: "206px",}}>IIT Madras Research Park</div>
      <div style={{position: "absolute", top: "393px", left: "340px", display: "inline-block", width: "315px",}}>Chennai, India</div>
      <div style={{position: "absolute", top: "315px", left: "607px", fontSize: "16px", fontWeight: "600",}}>Today’s CO2 Reduction</div>
      <div style={{position: "absolute", top: "214px", left: "339px", fontSize: "16px", fontWeight: "600",}}>Monitor</div>
      <div style={{position: "absolute", top: "214px", left: "432px", fontSize: "16px", fontWeight: "600", color: "#b1b1b1",}}>Control</div>
      <div style={{position: "absolute", top: "393px", left: "683px", fontSize: "12px", display: "inline-block", width: "166px",}}>Tons of CO2 Equivalent</div>
      <div style={{position: "absolute", top: "373px", left: "607px", fontSize: "32px", fontWeight: "600", color: "#69b931",}}>5.53</div>
      <div style={{position: "absolute", top: "373px", left: "884px", fontSize: "32px", fontWeight: "600", color: "#d24242",}}>4200</div>
      <div style={{position: "absolute", top: "61px", left: "610px", fontSize: "24px", fontWeight: "600", display: "inline-block", width: "315px",}}>IIT Madras Research Park</div>
      <div style={{position: "absolute", top: "315px", left: "884px", fontSize: "16px", fontWeight: "600", display: "inline-block", width: "315px",}}>{`Peak Demand `}</div>
      <div style={{position: "absolute", top: "393px", left: "973px", fontSize: "12px", display: "inline-block", width: "315px",}}>kVA</div>
      <div style={{position: "absolute", top: "297px", left: "1073px", borderRadius: "10px", background: "radial-gradient(50% 50% at 50% 50%, #054011, #69b931)", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "347px", height: "134px", overflow: "hidden", color: "#fbfbfb", fontFamily: "Inter",}}>
        <div style={{position: "absolute", height: "100%", width: "100%", top: "0%", right: "0%", bottom: "0%", left: "0%",}}>
          <div style={{position: "absolute", height: "100%", width: "100%", top: "0%", right: "0%", bottom: "0%", left: "0%", background: "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 84.51%)", boxShadow: "-1px 3px 10px rgba(0, 0, 0, 0.2) inset, 20px -20px 50px rgba(0, 0, 0, 0.8) inset, -20px 20px 60px #fff inset",}} />
          <div style={{position: "absolute", height: "100%", width: "100%", top: "0%", right: "0%", bottom: "0%", left: "0%", background: "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5) 84.51%)", boxShadow: "-20px 20px 60px #fff inset", display: "none",}} />
          <div style={{position: "absolute", height: "100%", width: "100%", top: "0%", right: "0%", bottom: "0%", left: "0%", background: "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4) 84.51%)", boxShadow: "-20px 20px 60px #fff inset", display: "none",}} />
        </div>
        <div style={{position: "absolute", top: "80px", left: "24px", width: "127px", display: "none", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "6px",}}>
          <div style={{width: "127px", position: "relative", letterSpacing: "-0.01em", lineHeight: "17px", fontWeight: "500", display: "inline-block",}}>Figma</div>
          <div style={{width: "127px", position: "relative", fontSize: "12px", lineHeight: "14px", display: "inline-block", opacity: "0.8",}}>@cmorris</div>
        </div>
        <img style={{position: "absolute", height: "101.71%", width: "97.14%", top: "-3.43%", right: "-0.57%", bottom: "1.71%", left: "3.43%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%", display: "none",}} alt="" src="/gloss-effects.svg" />
        <img style={{position: "absolute", top: "24px", left: "24px", width: "38px", height: "38px", overflow: "hidden", display: "none",}} alt="" src="/fav.svg" />
      </div>
      <div style={{position: "absolute", top: "314px", left: "1105px", fontSize: "16px", fontWeight: "600", color: "#fff",}}>Savings</div>
      <div style={{position: "absolute", top: "399px", left: "1105px", fontSize: "12px", color: "#fff",}}>{`During Peak Shaving `}</div>
      <div style={{position: "absolute", top: "346px", left: "1105px", fontSize: "12px", fontWeight: "500", color: "#fff",}}>Energy</div>
      <div style={{position: "absolute", top: "346px", left: "1277px", fontSize: "12px", fontWeight: "500", color: "#fff",}}>Cost</div>
      <div style={{position: "absolute", top: "399px", left: "1277px", fontSize: "12px", color: "#fff",}}>During peak hours</div>
      <div style={{position: "absolute", top: "379px", left: "1157px", fontSize: "12px", color: "#fff",}}>kWh (Avg)</div>
      <div style={{position: "absolute", top: "367px", left: "1105px", fontSize: "24px", fontWeight: "600", color: "#fff",}}>1.4K</div>
      <div style={{position: "absolute", top: "367px", left: "1277px", fontSize: "24px", color: "#fff", fontFamily: "Inter",}}>
        <span style={{fontWeight: "500",}}>{`₹ `}</span>
        <span style={{fontWeight: "600", fontFamily: "Poppins",}}>2K</span>
      </div>
      <div style={{position: "absolute", top: "317px", left: "1343px", width: "51.47px", height: "18px", fontSize: "12px", color: "#fff",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "500",}}>Today</div>
        <img style={{position: "absolute", top: "2.73px", left: "40px", width: "11.47px", height: "11.47px", objectFit: "contain",}} alt="" src="/polygon-2.svg" />
      </div>
      <img style={{position: "absolute", top: "345px", left: "1258px", maxWidth: "100%", overflow: "hidden", height: "70px",}} alt="" src="/vector-3.svg" />
      <img style={{position: "absolute", top: "345px", left: "855px", maxWidth: "100%", overflow: "hidden", height: "70px",}} alt="" src="/vector-3.svg" />
      <img style={{position: "absolute", top: "345px", left: "571px", maxWidth: "100%", overflow: "hidden", height: "70px",}} alt="" src="/vector-3.svg" />
      <img style={{position: "absolute", top: "403px", left: "1233px", width: "11px", height: "11px", overflow: "hidden",}} alt="" src="/mdiinformationoutline.svg" />
      <img style={{position: "absolute", top: "403px", left: "1390px", width: "11px", height: "11px", overflow: "hidden",}} alt="" src="/mdiinformationoutline.svg" />
      <div style={{position: "absolute", top: "1071px", left: "309px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "1111px", height: "547px",}} />
      <div style={{position: "absolute", top: "1104px", left: "341px", fontSize: "16px", fontWeight: "600",}}>Consumption</div>
      <div style={{position: "absolute", top: "447px", left: "309px", width: "1111px", height: "608px", fontSize: "48px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "1111px", height: "608px",}} />
        <div style={{position: "absolute", top: "25px", left: "32px", width: "1031px", height: "536px",}}>
          <div style={{position: "absolute", top: "1px", left: "0px", width: "481px", height: "535px",}}>
            <div style={{position: "absolute", top: "0px", left: "0px", width: "481px", height: "207px",}}>
              <div style={{position: "absolute", top: "50px", left: "1px", width: "480px", height: "157px",}}>
                <div style={{position: "absolute", top: "0px", left: "0px", width: "149px", height: "91px",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>60%</div>
                  <div style={{position: "absolute", top: "67px", left: "0px", fontSize: "16px", fontWeight: "500", color: "#adadad",}}>Renewable Energy</div>
                </div>
                <div style={{position: "absolute", top: "100px", left: "0px", width: "480px", height: "57px", fontSize: "14px", color: "#adadad",}}>
                  <div style={{position: "absolute", top: "24px", left: "0px", width: "480px", height: "33px",}}>
                    <img style={{position: "absolute", top: "15px", left: "300px", width: "16.2px", height: "16.2px",}} alt="" src="/polygon-2.svg" />
                    <div style={{position: "absolute", top: "0px", left: "0px", width: "480px", height: "10px",}}>
                      <div style={{position: "absolute", top: "0px", left: "0px", backgroundColor: "#d9d9d9", width: "480px", height: "10px",}} />
                      <div style={{position: "absolute", top: "0px", left: "0px", backgroundColor: "#21d544", width: "307px", height: "10px",}} />
                    </div>
                    <div style={{position: "absolute", top: "12px", left: "321px", fontWeight: "500",}}>Present</div>
                    <div style={{position: "absolute", top: "12px", left: "0px", fontWeight: "500",}}>0%</div>
                    <div style={{position: "absolute", top: "12px", left: "446px", fontWeight: "500",}}>100%</div>
                  </div>
                  <div style={{position: "absolute", top: "0px", left: "447px", fontWeight: "500",}}>Goal</div>
                </div>
                <div style={{position: "absolute", top: "9px", left: "396px", width: "84px", height: "52px", fontSize: "24px", color: "#69b931",}}>
                  <div style={{position: "absolute", top: "0px", left: "30px", width: "54px", height: "36px",}}>
                    <div style={{position: "absolute", top: "0px", left: "20px", fontWeight: "600",}}>2%</div>
                    <img style={{position: "absolute", top: "8px", left: "0px", width: "0px", height: "18px", objectFit: "contain",}} alt="" src="/arrow-1.svg" />
                  </div>
                  <div style={{position: "absolute", top: "31px", left: "0px", width: "83.93px", height: "21px", fontSize: "14px", color: "#adadad",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "500",}}>This Week</div>
                    <img style={{position: "absolute", top: "5px", left: "73px", width: "10.93px", height: "10.93px", objectFit: "contain",}} alt="" src="/polygon-2.svg" />
                  </div>
                </div>
              </div>
              <div style={{position: "absolute", top: "0px", left: "0px", width: "283px", height: "24px", fontSize: "16px",}}>
                <div style={{position: "absolute", top: "0px", left: "0px", width: "283px", height: "24px",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Renewable Energy Performance</div>
                  <img style={{position: "absolute", top: "4px", left: "265px", width: "18px", height: "18px", overflow: "hidden",}} alt="" src="/mdiinformationoutline.svg" />
                </div>
              </div>
            </div>
            <div style={{position: "absolute", top: "253px", left: "1px", width: "479px", height: "282px", fontSize: "12px",}}>
              <div style={{position: "absolute", top: "0px", left: "0px", fontSize: "16px", fontWeight: "600",}}>Building Consumption</div>
              <img style={{position: "absolute", top: "51px", left: "190px", maxWidth: "100%", overflow: "hidden", height: "228px",}} alt="" src="/vector-2.svg" />
              <div style={{position: "absolute", top: "3px", left: "235px", width: "244px", height: "279px", color: "#adadad",}}>
                <div style={{position: "absolute", top: "261px", left: "160px",}}>Energy in kWh</div>
                <div style={{position: "absolute", top: "0px", left: "179px", fontWeight: "500",}}>12/12/2023</div>
                <div style={{position: "absolute", top: "46px", left: "0px", width: "243px", height: "192px", fontSize: "16px", color: "#2b2b2b",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", width: "207px", height: "101px",}}>
                    <div style={{position: "absolute", top: "2px", left: "0px", width: "47px", height: "45px", fontSize: "14px",}}>
                      <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Grid `}</div>
                      <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600",}}>31508</div>
                    </div>
                    <div style={{position: "absolute", top: "56px", left: "0px", width: "117px", height: "45px",}}>
                      <div style={{position: "absolute", top: "21px", left: "0px", fontWeight: "600",}}>6119</div>
                      <div style={{position: "absolute", top: "0px", left: "0px", fontSize: "14px",}}>Wheeled in Solar</div>
                    </div>
                    <div style={{position: "absolute", top: "0px", left: "152px", width: "55px", height: "45px",}}>
                      <div style={{position: "absolute", top: "21px", left: "0px", fontWeight: "600",}}>1984</div>
                      <div style={{position: "absolute", top: "0px", left: "0px", fontSize: "14px",}}>Rooftop</div>
                    </div>
                    <div style={{position: "absolute", top: "56px", left: "152px", width: "42px", height: "45px", color: "#adadad",}}>
                      <div style={{position: "absolute", top: "21px", left: "0px", fontWeight: "600",}}>0</div>
                      <div style={{position: "absolute", top: "0px", left: "0px", fontSize: "14px",}}>Diesel</div>
                    </div>
                  </div>
                  <div style={{position: "absolute", top: "130px", left: "0px", width: "243px", height: "62px", fontSize: "14px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", width: "91px", height: "62px",}}>
                      <div style={{position: "absolute", top: "0px", left: "0px", lineHeight: "124.5%",}}>
                        <p style={{margin: "",}}>Power Factor</p>
                        <p style={{margin: "",}}>(Min)</p>
                      </div>
                      <div style={{position: "absolute", top: "38px", left: "0px", fontSize: "16px", fontWeight: "600",}}>0.992</div>
                    </div>
                    <div style={{position: "absolute", top: "0px", left: "152px", width: "91px", height: "62px",}}>
                      <div style={{position: "absolute", top: "0px", left: "0px", lineHeight: "124.5%",}}>
                        <p style={{margin: "",}}>Power Factor</p>
                        <p style={{margin: "",}}>(Avg)</p>
                      </div>
                      <div style={{position: "absolute", top: "38px", left: "0px", fontSize: "16px", fontWeight: "600",}}>0.992</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{position: "absolute", top: "47px", left: "0px", width: "140px", height: "234px",}}>
                <div style={{position: "absolute", top: "156px", left: "0px", width: "140px", height: "78px",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", width: "64px", height: "18px",}}>
                    <div style={{position: "absolute", top: "0px", left: "39px",}}>Grid</div>
                    <div style={{position: "absolute", top: "1px", left: "0px", borderRadius: "2px", backgroundColor: "#7a6464", width: "28px", height: "15px",}} />
                  </div>
                  <div style={{position: "absolute", top: "20px", left: "0px", width: "86px", height: "18px",}}>
                    <div style={{position: "absolute", top: "0px", left: "39px",}}>Rooftop</div>
                    <div style={{position: "absolute", top: "1px", left: "0px", borderRadius: "2px", backgroundColor: "#947f9b", width: "28px", height: "15px",}} />
                  </div>
                  <div style={{position: "absolute", top: "40px", left: "0px", width: "140px", height: "18px",}}>
                    <div style={{position: "absolute", top: "0px", left: "39px",}}>Wheeled in Solar</div>
                    <div style={{position: "absolute", top: "1px", left: "0px", borderRadius: "2px", backgroundColor: "#f17e50", width: "28px", height: "15px",}} />
                  </div>
                  <div style={{position: "absolute", top: "60px", left: "0px", width: "75px", height: "18px",}}>
                    <div style={{position: "absolute", top: "0px", left: "39px",}}>Diesel</div>
                    <div style={{position: "absolute", top: "1px", left: "0px", borderRadius: "2px", backgroundColor: "#303030", width: "28px", height: "15px",}} />
                  </div>
                </div>
                <div style={{position: "absolute", top: "0px", left: "0px", width: "137px", height: "137px", fontSize: "10px", color: "#fff",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", width: "137px", height: "137px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "50%", backgroundColor: "#7a6464", width: "137px", height: "137px",}} />
                    <div style={{position: "absolute", top: "102px", left: "54px", fontWeight: "600",}}>79.8%</div>
                    <div style={{position: "absolute", top: "0px", left: "0px", width: "137px", height: "137px",}}>
                      <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "50%", backgroundColor: "#947f9b", border: "1px solid #fff", boxSizing: "border-box", width: "137px", height: "137px",}} />
                      <div style={{position: "absolute", top: "48px", left: "13px", fontWeight: "600",}}>5.2%</div>
                    </div>
                    <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "50%", backgroundColor: "#f17e50", border: "1px solid #fff", boxSizing: "border-box", width: "137px", height: "137px",}} />
                    <div style={{position: "absolute", top: "21px", left: "34px", fontWeight: "600",}}>15.2%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img style={{position: "absolute", top: "39px", left: "524px", maxWidth: "100%", overflow: "hidden", height: "496px",}} alt="" src="/vector-3.svg" />
          <div style={{position: "absolute", top: "0px", left: "572px", width: "459px", height: "208px", fontSize: "16px",}}>
            <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>{`Performance % `}</div>
            <div style={{position: "absolute", top: "42px", left: "1px", width: "458px", height: "166px", fontSize: "12px",}}>
              <div style={{position: "absolute", top: "148px", left: "22px", width: "414px", height: "18px",}}>
                <div style={{position: "absolute", top: "0px", left: "0px", width: "140px", height: "18px",}}>
                  <div style={{position: "absolute", top: "0px", left: "39px",}}>Wheeled in Solar</div>
                  <div style={{position: "absolute", top: "1px", left: "0px", borderRadius: "2px", backgroundColor: "#f99e7d", width: "28px", height: "15px",}} />
                </div>
                <div style={{position: "absolute", top: "0px", left: "172px", width: "120px", height: "18px",}}>
                  <div style={{position: "absolute", top: "0px", left: "39px",}}>Rooftop Solar</div>
                  <div style={{position: "absolute", top: "1px", left: "0px", borderRadius: "2px", backgroundColor: "#9d86a5", width: "28px", height: "15px",}} />
                </div>
                <div style={{position: "absolute", top: "0px", left: "344px", width: "70px", height: "18px",}}>
                  <div style={{position: "absolute", top: "0px", left: "39px",}}>Wind</div>
                  <div style={{position: "absolute", top: "1px", left: "0px", borderRadius: "2px", backgroundColor: "#3c4385", width: "28px", height: "15px",}} />
                </div>
              </div>
              <div style={{position: "absolute", top: "0px", left: "0px", width: "458px", height: "129px", fontSize: "20px", color: "#fff",}}>
                <img style={{position: "absolute", top: "0px", left: "0px", width: "458px", height: "129px",}} alt="" src="/group-44.svg" />
                <div style={{position: "absolute", top: "74px", left: "179px", fontSize: "32px", fontWeight: "600",}}>55%</div>
                <div style={{position: "absolute", top: "95px", left: "35px", fontWeight: "600",}}>15%</div>
                <div style={{position: "absolute", top: "95px", left: "356px", fontWeight: "600",}}>30%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{position: "absolute", top: "811px", left: "880px", borderRadius: "10px", background: "linear-gradient(180deg, #ae93b8, #907b97)", width: "526px", height: "104px",}} />
      <div style={{position: "absolute", top: "702px", left: "880px", width: "526px", height: "104px", fontSize: "12px", color: "#fff",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", background: "linear-gradient(180deg, #f17e4f, #ffb8a2)", width: "526px", height: "104px",}} />
        <div style={{position: "absolute", top: "42px", left: "16px", fontSize: "32px", fontWeight: "600",}}>55%</div>
        <div style={{position: "absolute", top: "16px", left: "56px", fontSize: "14px", fontWeight: "600",}}>Wheeled in Solar</div>
        <div style={{position: "absolute", top: "13px", left: "216px",}}>
          <p style={{margin: "",}}>
            <span>Generation</span>
              <span style={{fontSize: "14px",}}>{` `}</span>
          </p>
          <p style={{margin: "", fontSize: "10px",}}>{`(kWh) `}</p>
        </div>
        <div style={{position: "absolute", top: "53px", left: "218px", fontSize: "20px", fontWeight: "600",}}>6739</div>
        <div style={{position: "absolute", top: "13px", left: "317px", display: "inline-block", width: "81px",}}>
          <p style={{margin: "",}}>
            <span>Specific yield</span>
              <span style={{fontSize: "14px",}}>{` `}</span>
          </p>
          <p style={{margin: "", fontSize: "10px",}}>(kWh/kWp)</p>
        </div>
        <div style={{position: "absolute", top: "53px", left: "317px", fontSize: "20px", fontWeight: "600",}}>3.38</div>
        <div style={{position: "absolute", top: "13px", left: "418px", display: "inline-block", width: "69px",}}>
          <p style={{margin: "",}}>
            <span>Irradiation</span>
              <span style={{fontSize: "14px",}}>{` `}</span>
          </p>
          <p style={{margin: "", fontSize: "10px",}}>(kWh/m2)</p>
        </div>
        <div style={{position: "absolute", top: "53px", left: "418px", fontSize: "20px", fontWeight: "600",}}>3.93</div>
      </div>
      <div style={{position: "absolute", top: "857px", left: "896px", fontSize: "32px", fontWeight: "600", color: "#fff",}}>15%</div>
      <div style={{position: "absolute", top: "827px", left: "936px", fontWeight: "600", color: "#fff",}}>Rooftop Solar</div>
      <div style={{position: "absolute", top: "822px", left: "1096px", color: "#fff", fontSize: "12px",}}>
        <p style={{margin: "",}}>
          <span>Generation</span>
            <span style={{fontSize: "14px",}}>{` `}</span>
        </p>
        <p style={{margin: "", fontSize: "10px",}}>{`(kWh) `}</p>
      </div>
      <div style={{position: "absolute", top: "862px", left: "1098px", fontSize: "20px", fontWeight: "600", color: "#fff",}}>6739</div>
      <img style={{position: "absolute", top: "720px", left: "1060px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/mdiinformationoutline.svg" />
      <img style={{position: "absolute", top: "830px", left: "1036px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/mdiinformationoutline.svg" />
      <div style={{position: "absolute", top: "822px", left: "1197px", color: "#fff", display: "inline-block", width: "81px", fontSize: "12px",}}>
        <p style={{margin: "",}}>
          <span>Specific yield</span>
            <span style={{fontSize: "14px",}}>{` `}</span>
        </p>
        <p style={{margin: "", fontSize: "10px",}}>(kWh/kWp)</p>
      </div>
      <div style={{position: "absolute", top: "862px", left: "1197px", fontSize: "20px", fontWeight: "600", color: "#fff",}}>3.38</div>
      <div style={{position: "absolute", top: "822px", left: "1298px", color: "#fff", display: "inline-block", width: "69px", fontSize: "12px",}}>
        <p style={{margin: "",}}>
          <span>Irradiation</span>
            <span style={{fontSize: "14px",}}>{` `}</span>
        </p>
        <p style={{margin: "", fontSize: "10px",}}>(kWh/m2)</p>
      </div>
      <div style={{position: "absolute", top: "862px", left: "1298px", fontSize: "20px", fontWeight: "600", color: "#fff",}}>3.93</div>
      <div style={{position: "absolute", top: "477px", left: "1335px", fontSize: "12px", color: "#5a5a5a",}}>Explore</div>
      <img style={{position: "absolute", top: "478px", left: "1383px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/fluentopen12regular.svg" />
      <img style={{position: "absolute", top: "708px", left: "1384px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/fluentopen12regular.svg" />
      <img style={{position: "absolute", top: "817px", left: "1384px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/fluentopen12regular.svg" />
      <img style={{position: "absolute", height: "0.48%", width: "2.22%", top: "19.31%", right: "35.56%", bottom: "80.21%", left: "62.22%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/group-151.svg" />
      <div style={{position: "absolute", top: "920px", left: "880px", borderRadius: "10px", background: "linear-gradient(180deg, #373b5a, #3f4aab)", width: "526px", height: "104px",}} />
      <img style={{position: "absolute", height: "0.45%", width: "2.22%", top: "22.39%", right: "35.56%", bottom: "77.17%", left: "62.22%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/group.svg" />
      <div style={{position: "absolute", top: "965px", left: "896px", fontSize: "32px", fontWeight: "600", color: "#fff",}}>30%</div>
      <div style={{position: "absolute", top: "935px", left: "936px", fontWeight: "600", color: "#fff",}}>Wind</div>
      <div style={{position: "absolute", top: "935px", left: "1096px", color: "#fff", fontSize: "12px",}}>
        <p style={{margin: "",}}>
          <span>Generation</span>
            <span style={{fontSize: "14px",}}>{` `}</span>
        </p>
        <p style={{margin: "", fontSize: "10px",}}>{`(kWh) `}</p>
      </div>
      <img style={{position: "absolute", top: "937px", left: "978px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/mdiinformationoutline.svg" />
      <div style={{position: "absolute", top: "975px", left: "1098px", fontSize: "20px", fontWeight: "600", color: "#fff",}}>6739</div>
      <div style={{position: "absolute", top: "935px", left: "1197px", color: "#fff", display: "inline-block", width: "81px", fontSize: "12px",}}>
        <p style={{margin: "",}}>
          <span>Specific yield</span>
            <span style={{fontSize: "14px",}}>{` `}</span>
        </p>
        <p style={{margin: "", fontSize: "10px",}}>(kWh/kWp)</p>
      </div>
      <div style={{position: "absolute", top: "975px", left: "1197px", fontSize: "20px", fontWeight: "600", color: "#fff",}}>3.38</div>
      <img style={{position: "absolute", top: "927px", left: "1384px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/fluentopen12regular.svg" />
      <div style={{position: "absolute", top: "935px", left: "1298px", color: "#fff", display: "inline-block", width: "69px", fontSize: "12px",}}>
        <p style={{margin: "",}}>
          <span>Irradiation</span>
            <span style={{fontSize: "14px",}}>{` `}</span>
        </p>
        <p style={{margin: "", fontSize: "10px",}}>(kWh/m2)</p>
      </div>
      <div style={{position: "absolute", top: "975px", left: "1298px", fontSize: "20px", fontWeight: "600", color: "#fff",}}>3.93</div>
      <img style={{position: "absolute", top: "254px", left: "339px", maxHeight: "100%", width: "1072px",}} alt="" src="/vector-42.svg" />
      <img style={{position: "absolute", top: "254px", left: "339px", maxHeight: "100%", width: "74px",}} alt="" src="/vector-43.svg" />
      <div style={{position: "absolute", top: "calc(50% - 1704.5px)", left: "calc(50% + 314px)", borderRadius: "10px", backgroundColor: "#fff", border: "1px solid #cfcfcf", boxSizing: "border-box", width: "386px", height: "56px",}} />
      <img style={{position: "absolute", top: "calc(50% - 1690.5px)", left: "calc(50% + 334px)", width: "27px", height: "27px", overflow: "hidden",}} alt="" src="/iconamoonsearchbold.svg" />
      <div style={{position: "absolute", top: "calc(50% - 1691.5px)", left: "calc(50% + 379px)", fontSize: "20px", fontWeight: "500", color: "#b1b1b1",}}>Search</div>
      <img style={{position: "absolute", top: "161px", left: "1379px", width: "27px", height: "27px", overflow: "hidden",}} alt="" src="/materialsymbolskeyboardvoice.svg" />
      <img style={{position: "absolute", top: "-59px", left: "10px", width: "204px", height: "204px", objectFit: "cover",}} alt="" src="/energy-management-systemlogos-transparent-2@2x.png" />
      <img style={{position: "absolute", top: "47px", left: "1342px", width: "66px", height: "30px", objectFit: "cover",}} alt="" src="/ceet-logo-transparent-1@2x.png" />
      <div style={{position: "absolute", top: "1199px", left: "343px", width: "1047px", height: "372px",}}>
        <img style={{position: "absolute", top: "0px", left: "0px", maxWidth: "100%", overflow: "hidden", height: "325px",}} alt="" src="/vector-44.svg" />
        <img style={{position: "absolute", top: "0px", left: "236px", maxWidth: "100%", overflow: "hidden", height: "276px",}} alt="" src="/vector-45.svg" />
        <img style={{position: "absolute", top: "0px", left: "472px", maxWidth: "100%", overflow: "hidden", height: "253px",}} alt="" src="/vector-46.svg" />
        <img style={{position: "absolute", top: "10px", left: "708px", maxWidth: "100%", overflow: "hidden", height: "244px",}} alt="" src="/vector-47.svg" />
        <img style={{position: "absolute", top: "10px", left: "944px", maxWidth: "100%", overflow: "hidden", height: "263px",}} alt="" src="/vector-48.svg" />
        <img style={{position: "absolute", top: "10px", left: "1047px", maxWidth: "100%", overflow: "hidden", height: "263px",}} alt="" src="/vector-48.svg" />
        <div style={{position: "absolute", top: "0px", left: "16px", fontWeight: "600",}}>Clients</div>
        <div style={{position: "absolute", top: "57px", left: "16px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
        <div style={{position: "absolute", top: "57px", left: "252px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
        <div style={{position: "absolute", top: "57px", left: "488px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
        <div style={{position: "absolute", top: "57px", left: "724px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
        <div style={{position: "absolute", top: "0px", left: "252px", fontWeight: "600",}}>Utilities</div>
        <div style={{position: "absolute", top: "0px", left: "488px", fontWeight: "600",}}>Chillers</div>
        <div style={{position: "absolute", top: "0px", left: "724px", fontWeight: "600",}}>Others</div>
        <img style={{position: "absolute", top: "231px", left: "708px", width: "236px", height: "62px",}} alt="" src="/rectangle-110.svg" />
        <img style={{position: "absolute", top: "248px", left: "944px", width: "103px", height: "31px",}} alt="" src="/rectangle-115.svg" />
        <img style={{position: "absolute", top: "213px", left: "472px", width: "236px", height: "96px",}} alt="" src="/rectangle-111.svg" />
        <img style={{position: "absolute", top: "187px", left: "236px", width: "236px", height: "140px",}} alt="" src="/rectangle-112.svg" />
        <img style={{position: "absolute", top: "134px", left: "0px", width: "236px", height: "238px",}} alt="" src="/rectangle-113.svg" />
        <img style={{position: "absolute", top: "243px", left: "708px", width: "236px", height: "39px",}} alt="" src="/rectangle-106.svg" />
        <img style={{position: "absolute", top: "254px", left: "944px", width: "103px", height: "19px",}} alt="" src="/rectangle-114.svg" />
        <img style={{position: "absolute", top: "232px", left: "472px", width: "236px", height: "60px",}} alt="" src="/rectangle-107.svg" />
        <img style={{position: "absolute", top: "216px", left: "236px", width: "236px", height: "87px",}} alt="" src="/rectangle-108.svg" />
        <img style={{position: "absolute", top: "183px", left: "0px", width: "236px", height: "148px",}} alt="" src="/rectangle-109.svg" />
        <div style={{position: "absolute", top: "34px", left: "16px", color: "#5a5a5a",}}>Total</div>
        <div style={{position: "absolute", top: "34px", left: "252px", color: "#5a5a5a",}}>Total</div>
        <div style={{position: "absolute", top: "34px", left: "488px", color: "#5a5a5a",}}>Total</div>
        <div style={{position: "absolute", top: "34px", left: "724px",}}>Total</div>
        <div style={{position: "absolute", top: "57px", left: "959px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
        <div style={{position: "absolute", top: "0px", left: "959px", fontWeight: "600",}}>Others</div>
        <div style={{position: "absolute", top: "34px", left: "959px",}}>Total</div>
      </div>
      <div style={{position: "absolute", top: "1153px", left: "1206px", width: "128.48px", height: "24px", fontSize: "16px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Past 24 Hours</div>
        <img style={{position: "absolute", top: "2.92px", left: "111px", width: "17.48px", height: "17.48px", objectFit: "contain",}} alt="" src="/polygon-2.svg" />
      </div>
      <div style={{position: "absolute", top: "1634px", left: "309px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "1111px", height: "423px",}} />
      <img style={{position: "absolute", height: "0.41%", width: "1.04%", top: "44.91%", right: "70.63%", bottom: "54.69%", left: "28.33%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
      <div style={{position: "absolute", top: "2025px", left: "832px", fontSize: "12px", fontWeight: "500", color: "#0d6bf9",}}>Show More</div>
      <div style={{position: "absolute", top: "1658px", left: "341px", fontSize: "16px", fontWeight: "600",}}>Chillers</div>
      <div style={{position: "absolute", top: "1649px", left: "1205px", width: "201px", height: "67px", color: "#fff",}}>
        <img style={{position: "absolute", top: "0px", left: "0px", borderRadius: "5px", width: "201px", height: "67px", objectFit: "cover",}} alt="" src="/rectangle-22@2x.png" />
        <div style={{position: "absolute", top: "14px", left: "14px", width: "169px", height: "41px",}}>
          <div style={{position: "absolute", top: "0px", left: "0px", lineHeight: "108%", fontWeight: "500",}}>Total Cooling of the day</div>
          <div style={{position: "absolute", top: "15px", left: "1px", lineHeight: "108%", fontWeight: "600", fontSize: "20px",}}>
            <span>13959</span>
            <span style={{fontSize: "24px",}}>{` `}</span>
            <span style={{fontSize: "16px",}}>TR</span>
          </div>
        </div>
      </div>
      <img style={{position: "absolute", top: "1767px", left: "865px", maxWidth: "100%", overflow: "hidden", height: "198px",}} alt="" src="/vector-2.svg" />
      <div style={{position: "absolute", top: "1732px", left: "919px", width: "457px", height: "268px", fontSize: "12px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", width: "457px", height: "268px",}}>
          <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>E Block</div>
          <div style={{position: "absolute", top: "20px", left: "0px", width: "457px", height: "181px", fontSize: "10px",}}>
            <div style={{position: "absolute", top: "0px", left: "203px", fontWeight: "600",}}>Evaporator</div>
            <div style={{position: "absolute", top: "166px", left: "203px", fontWeight: "600",}}>Condensor</div>
            <div style={{position: "absolute", top: "20px", left: "0px", width: "457px", height: "141px", fontSize: "14px",}}>
              <div style={{position: "absolute", top: "0px", left: "40px", width: "377px", height: "141px", fontSize: "12px",}}>
                <img style={{position: "absolute", top: "30px", left: "0px", width: "47px", height: "25px",}} alt="" src="/rectangle-19.svg" />
                <img style={{position: "absolute", top: "30px", left: "330px", width: "47px", height: "25px", objectFit: "contain",}} alt="" src="/rectangle-21.svg" />
                <img style={{position: "absolute", top: "91px", left: "0px", width: "47px", height: "24px",}} alt="" src="/rectangle-20.svg" />
                <img style={{position: "absolute", top: "91px", left: "330px", width: "47px", height: "24px", objectFit: "contain",}} alt="" src="/rectangle-22.svg" />
                <div style={{position: "absolute", top: "0px", left: "45px", borderRadius: "10px", backgroundColor: "#f2f2f2", border: "0.5px solid #b1b1b1", boxSizing: "border-box", width: "287px", height: "141px",}} />
                <div style={{position: "absolute", top: "19.67px", left: "69px", width: "52px", height: "100.73px",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", width: "52px", height: "100.73px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#d5cecc", width: "51.68px", height: "100.73px",}} />
                    <img style={{position: "absolute", top: "22.33px", left: "0px", width: "52px", height: "78px",}} alt="" src="/rectangle-18.svg" />
                  </div>
                  <div style={{position: "absolute", top: "38.91px", left: "12px", width: "27px", height: "25.59px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>4.06</div>
                    <div style={{position: "absolute", top: "14.59px", left: "1.91px", fontSize: "10px", lineHeight: "108%",}}>COP</div>
                  </div>
                  <div style={{position: "absolute", top: "10.22px", left: "4.81px", fontSize: "10px", lineHeight: "108%",}}>C5</div>
                </div>
                <div style={{position: "absolute", top: "19.67px", left: "131px", width: "51.68px", height: "100.73px",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", width: "51.68px", height: "100.73px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#ff7338", width: "51.68px", height: "100.73px",}} />
                  </div>
                  <div style={{position: "absolute", top: "38.91px", left: "14px", width: "23px", height: "25.59px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>4.12</div>
                    <div style={{position: "absolute", top: "14.59px", left: "0.64px", fontSize: "10px", lineHeight: "108%",}}>COP</div>
                  </div>
                  <div style={{position: "absolute", top: "10.22px", left: "5.34px", fontSize: "10px", lineHeight: "108%",}}>C6</div>
                </div>
                <div style={{position: "absolute", top: "20px", left: "193px", width: "51.68px", height: "100px",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", width: "51.68px", height: "100px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#ff7338", width: "51.68px", height: "100px",}} />
                  </div>
                  <div style={{position: "absolute", top: "39.39px", left: "13px", width: "26px", height: "25.59px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>3.88</div>
                    <div style={{position: "absolute", top: "14.59px", left: "1.91px", fontSize: "10px", lineHeight: "108%",}}>COP</div>
                  </div>
                  <div style={{position: "absolute", top: "10.56px", left: "5.87px", fontSize: "10px", lineHeight: "108%",}}>C7</div>
                </div>
                <div style={{position: "absolute", top: "19.67px", left: "257px", width: "51.68px", height: "100.73px",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", width: "51.68px", height: "100.73px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#d5cecc", width: "51.68px", height: "100.73px",}} />
                  </div>
                  <div style={{position: "absolute", top: "38.91px", left: "14px", width: "22px", height: "25.59px",}}>
                    <div style={{position: "absolute", top: "0px", left: "7px", fontWeight: "600",}}>0</div>
                    <div style={{position: "absolute", top: "14.59px", left: "0px", fontSize: "10px", lineHeight: "108%",}}>COP</div>
                  </div>
                  <div style={{position: "absolute", top: "10.22px", left: "4.4px", fontSize: "10px", lineHeight: "108%",}}>C8</div>
                </div>
                <div style={{position: "absolute", top: "30px", left: "0px", backgroundColor: "#f2f2f2", width: "46px", height: "25px",}} />
                <div style={{position: "absolute", top: "91px", left: "0px", backgroundColor: "#f2f2f2", width: "46px", height: "24px",}} />
                <div style={{position: "absolute", top: "30px", left: "331px", backgroundColor: "#f2f2f2", width: "46px", height: "25px",}} />
                <div style={{position: "absolute", top: "91px", left: "331px", backgroundColor: "#f2f2f2", width: "46px", height: "24px",}} />
                <div style={{position: "absolute", top: "34px", left: "19px", fontWeight: "600", color: "#000",}}>In</div>
                <div style={{position: "absolute", top: "94px", left: "19px", fontWeight: "600", color: "#000",}}>In</div>
                <div style={{position: "absolute", top: "34px", left: "344px", fontWeight: "600", color: "#000",}}>Out</div>
                <div style={{position: "absolute", top: "94px", left: "344px", fontWeight: "600", color: "#000",}}>Out</div>
              </div>
              <div style={{position: "absolute", top: "32px", left: "5px", fontWeight: "600",}}>8 °C</div>
              <div style={{position: "absolute", top: "92px", left: "0px", fontWeight: "600",}}>10 °C</div>
              <div style={{position: "absolute", top: "32px", left: "422px", fontWeight: "600",}}>8 °C</div>
              <div style={{position: "absolute", top: "92px", left: "422px", fontWeight: "600",}}>10 °C</div>
            </div>
          </div>
          <div style={{position: "absolute", top: "223px", left: "8px", width: "441px", height: "45px", fontSize: "14px", color: "#5a5a5a",}}>
            <div style={{position: "absolute", top: "0px", left: "0px", width: "195px", height: "45px",}}>
              <div style={{position: "absolute", top: "0px", left: "0px",}}>Evaporator Flowrate (m3/h)</div>
              <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>552</div>
            </div>
            <div style={{position: "absolute", top: "0px", left: "245px", width: "196px", height: "45px",}}>
              <div style={{position: "absolute", top: "0px", left: "0px",}}>Condensor Flowrate (m3/h)</div>
              <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>1231</div>
            </div>
          </div>
        </div>
        <img style={{position: "absolute", top: "114px", left: "40px", width: "376px", height: "0px",}} alt="" src="/group-133.svg" />
      </div>
      <div style={{position: "absolute", top: "1732px", left: "350px", width: "457px", height: "268px", fontSize: "12px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", width: "457px", height: "268px",}}>
          <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>D Block</div>
          <div style={{position: "absolute", top: "20px", left: "0px", width: "457px", height: "181px", fontSize: "10px",}}>
            <div style={{position: "absolute", top: "0px", left: "203px", fontWeight: "600",}}>Evaporator</div>
            <div style={{position: "absolute", top: "166px", left: "203px", fontWeight: "600",}}>Condensor</div>
            <div style={{position: "absolute", top: "20px", left: "0px", width: "457px", height: "141px", fontSize: "14px",}}>
              <div style={{position: "absolute", top: "0px", left: "40px", width: "377px", height: "141px", fontSize: "12px",}}>
                <img style={{position: "absolute", top: "30px", left: "0px", width: "47px", height: "25px",}} alt="" src="/rectangle-19.svg" />
                <img style={{position: "absolute", top: "30px", left: "330px", width: "47px", height: "25px", objectFit: "contain",}} alt="" src="/rectangle-21.svg" />
                <img style={{position: "absolute", top: "91px", left: "0px", width: "47px", height: "24px",}} alt="" src="/rectangle-20.svg" />
                <img style={{position: "absolute", top: "91px", left: "330px", width: "47px", height: "24px", objectFit: "contain",}} alt="" src="/rectangle-22.svg" />
                <div style={{position: "absolute", top: "0px", left: "45px", borderRadius: "10px", backgroundColor: "#f2f2f2", border: "0.5px solid #b1b1b1", boxSizing: "border-box", width: "287px", height: "141px",}} />
                <div style={{position: "absolute", top: "19.67px", left: "69px", width: "51.68px", height: "100.73px",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", width: "51.68px", height: "100.73px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#d5cecc", width: "51.68px", height: "100.73px",}} />
                    <img style={{position: "absolute", top: "32.33px", left: "0.48px", width: "51px", height: "68px",}} alt="" src="/rectangle-18.svg" />
                  </div>
                  <div style={{position: "absolute", top: "38.91px", left: "12px", width: "27px", height: "25.59px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>4.06</div>
                    <div style={{position: "absolute", top: "14.59px", left: "1.91px", fontSize: "10px", lineHeight: "108%",}}>COP</div>
                  </div>
                  <div style={{position: "absolute", top: "10.22px", left: "4.81px", fontSize: "10px", lineHeight: "108%",}}>C1</div>
                </div>
                <div style={{position: "absolute", top: "19.67px", left: "131px", width: "52.06px", height: "100.73px",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", width: "52.06px", height: "100.73px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#d5cecc", width: "51.68px", height: "100.73px",}} />
                    <img style={{position: "absolute", top: "14.33px", left: "0.06px", width: "52px", height: "86px",}} alt="" src="/rectangle-18.svg" />
                  </div>
                  <div style={{position: "absolute", top: "38.91px", left: "14px", width: "23px", height: "25.59px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>4.12</div>
                    <div style={{position: "absolute", top: "14.59px", left: "0.64px", fontSize: "10px", lineHeight: "108%",}}>COP</div>
                  </div>
                  <div style={{position: "absolute", top: "10.22px", left: "5.34px", fontSize: "10px", lineHeight: "108%",}}>C2</div>
                </div>
                <div style={{position: "absolute", top: "20.48px", left: "193px", width: "52.05px", height: "100px",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", width: "52.05px", height: "100px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0.36px", borderRadius: "10px", backgroundColor: "#d5cecc", width: "51.68px", height: "100px",}} />
                    <img style={{position: "absolute", top: "56.52px", left: "0px", width: "52px", height: "43px",}} alt="" src="/rectangle-18.svg" />
                  </div>
                  <div style={{position: "absolute", top: "38.91px", left: "13px", width: "26px", height: "25.59px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>3.88</div>
                    <div style={{position: "absolute", top: "14.59px", left: "1.91px", fontSize: "10px", lineHeight: "108%",}}>COP</div>
                  </div>
                  <div style={{position: "absolute", top: "10.08px", left: "5.87px", fontSize: "10px", lineHeight: "108%",}}>C3</div>
                </div>
                <div style={{position: "absolute", top: "19.67px", left: "257px", width: "51.68px", height: "100.73px",}}>
                  <div style={{position: "absolute", top: "0px", left: "0px", width: "51.68px", height: "100.73px",}}>
                    <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#d5cecc", width: "51.68px", height: "100.73px",}} />
                  </div>
                  <div style={{position: "absolute", top: "38.91px", left: "14px", width: "22px", height: "25.59px",}}>
                    <div style={{position: "absolute", top: "0px", left: "7px", fontWeight: "600",}}>0</div>
                    <div style={{position: "absolute", top: "14.59px", left: "0px", fontSize: "10px", lineHeight: "108%",}}>COP</div>
                  </div>
                  <div style={{position: "absolute", top: "10.22px", left: "4.4px", fontSize: "10px", lineHeight: "108%",}}>C4</div>
                </div>
                <div style={{position: "absolute", top: "30px", left: "0px", backgroundColor: "#f2f2f2", width: "46px", height: "25px",}} />
                <div style={{position: "absolute", top: "91px", left: "0px", backgroundColor: "#f2f2f2", width: "46px", height: "24px",}} />
                <div style={{position: "absolute", top: "30px", left: "331px", backgroundColor: "#f2f2f2", width: "46px", height: "25px",}} />
                <div style={{position: "absolute", top: "91px", left: "331px", backgroundColor: "#f2f2f2", width: "46px", height: "24px",}} />
                <div style={{position: "absolute", top: "34px", left: "19px", fontWeight: "600", color: "#000",}}>In</div>
                <div style={{position: "absolute", top: "94px", left: "19px", fontWeight: "600", color: "#000",}}>In</div>
                <div style={{position: "absolute", top: "34px", left: "344px", fontWeight: "600", color: "#000",}}>Out</div>
                <div style={{position: "absolute", top: "94px", left: "344px", fontWeight: "600", color: "#000",}}>Out</div>
              </div>
              <div style={{position: "absolute", top: "32px", left: "5px", fontWeight: "600",}}>8 °C</div>
              <div style={{position: "absolute", top: "92px", left: "0px", fontWeight: "600",}}>10 °C</div>
              <div style={{position: "absolute", top: "32px", left: "422px", fontWeight: "600",}}>8 °C</div>
              <div style={{position: "absolute", top: "92px", left: "422px", fontWeight: "600",}}>10 °C</div>
            </div>
          </div>
          <div style={{position: "absolute", top: "223px", left: "8px", width: "441px", height: "45px", fontSize: "14px", color: "#5a5a5a",}}>
            <div style={{position: "absolute", top: "0px", left: "0px", width: "195px", height: "45px",}}>
              <div style={{position: "absolute", top: "0px", left: "0px",}}>Evaporator Flowrate (m3/h)</div>
              <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>552</div>
            </div>
            <div style={{position: "absolute", top: "0px", left: "245px", width: "196px", height: "45px",}}>
              <div style={{position: "absolute", top: "0px", left: "0px",}}>Condensor Flowrate (m3/h)</div>
              <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>1231</div>
            </div>
          </div>
        </div>
        <img style={{position: "absolute", top: "114px", left: "41px", width: "376px", height: "0px",}} alt="" src="/group-133.svg" />
      </div>
      {/* ---------------- */}
      <div style={{position: "absolute", top: "2585px", left: "309px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "1111px", height: "581px",}} />
      <div style={{position: "absolute", top: "3188px", left: "309px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "1111px", height: "483px",}} />
      <div style={{position: "absolute", top: "3349px", left: "342px", width: "332px", height: "132px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "332px", height: "132px", overflow: "hidden",}}>
          <div style={{position: "absolute", top: "16px", left: "107px", fontSize: "18px", fontWeight: "500",}}>MLCP Floor 3</div>
          <div style={{position: "absolute", top: "61px", left: "107px", fontWeight: "500",}}>Total Energy consumed</div>
          <div style={{position: "absolute", top: "88px", left: "107px", fontWeight: "600",}}>20 kWh</div>
          <div style={{position: "absolute", top: "82px", left: "24px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "12px", color: "#fff",}}>
            <div style={{borderRadius: "5px", backgroundColor: "#3c3c43", border: "1px solid #3c3c43", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", padding: "8px",}}>
              <div style={{position: "relative",}}>3.3 KW</div>
            </div>
          </div>
          <div style={{position: "absolute", top: "22px", left: "299px", borderRadius: "50%", backgroundColor: "#33ff00", width: "15px", height: "15px",}} />
          <img style={{position: "relative", width: "57px", height: "57px",}} alt="" src="/subtract.svg" />
        </div>
      </div>
      <div style={{position: "absolute", top: "3496px", left: "342px", width: "332px", height: "132px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "332px", height: "132px", overflow: "hidden",}}>
          <div style={{position: "absolute", top: "16px", left: "107px", fontSize: "18px", fontWeight: "500",}}>Pond Area</div>
          <div style={{position: "absolute", top: "61px", left: "107px", fontWeight: "500",}}>Total Energy consumed</div>
          <div style={{position: "absolute", top: "88px", left: "107px", fontWeight: "600",}}>20 kWh</div>
          <div style={{position: "absolute", top: "82px", left: "24px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "12px", color: "#fff",}}>
            <div style={{borderRadius: "5px", backgroundColor: "#3c3c43", border: "1px solid #3c3c43", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", padding: "8px",}}>
              <div style={{position: "relative",}}>7 KW</div>
            </div>
          </div>
          <div style={{position: "absolute", top: "22px", left: "299px", borderRadius: "50%", backgroundColor: "#33ff00", width: "15px", height: "15px",}} />
          <img style={{position: "relative", width: "0px", height: "0px",}} alt="" src="/subtract.svg" />
          <div style={{position: "absolute", top: "16px", left: "24px", borderRadius: "12px", backgroundColor: "#ffeb39", width: "60px", height: "60px",}} />
          <img style={{position: "absolute", height: "19.7%", width: "7.83%", top: "25%", right: "79.82%", bottom: "55.3%", left: "12.35%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
        </div>
      </div>
      <div style={{position: "absolute", top: "3349px", left: "689px", width: "332px", height: "132px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "332px", height: "132px", overflow: "hidden",}}>
          <div style={{position: "absolute", top: "16px", left: "107px", fontSize: "18px", fontWeight: "500",}}>MLCP Floor 3</div>
          <div style={{position: "absolute", top: "61px", left: "107px", fontWeight: "500",}}>Total Energy consumed</div>
          <div style={{position: "absolute", top: "88px", left: "107px", fontWeight: "600",}}>20 kWh</div>
          <div style={{position: "absolute", top: "82px", left: "24px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "12px", color: "#fff",}}>
            <div style={{borderRadius: "5px", backgroundColor: "#3c3c43", border: "1px solid #3c3c43", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", padding: "8px",}}>
              <div style={{position: "relative",}}>3.3 KW</div>
            </div>
          </div>
          <div style={{position: "absolute", top: "22px", left: "299px", borderRadius: "50%", backgroundColor: "#33ff00", width: "15px", height: "15px",}} />
          <img style={{position: "relative", width: "57px", height: "57px",}} alt="" src="/subtract.svg" />
        </div>
      </div>
      <div style={{position: "absolute", top: "3496px", left: "689px", width: "332px", height: "132px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "332px", height: "132px", overflow: "hidden",}}>
          <div style={{position: "absolute", top: "16px", left: "107px", fontSize: "18px", fontWeight: "500",}}>Pond Area</div>
          <div style={{position: "absolute", top: "61px", left: "107px", fontWeight: "500",}}>Total Energy consumed</div>
          <div style={{position: "absolute", top: "88px", left: "107px", fontWeight: "600",}}>20 kWh</div>
          <div style={{position: "absolute", top: "82px", left: "24px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "12px", color: "#fff",}}>
            <div style={{borderRadius: "5px", backgroundColor: "#3c3c43", border: "1px solid #3c3c43", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", padding: "8px",}}>
              <div style={{position: "relative",}}>7 KW</div>
            </div>
          </div>
          <div style={{position: "absolute", top: "22px", left: "299px", borderRadius: "50%", backgroundColor: "#33ff00", width: "15px", height: "15px",}} />
          <img style={{position: "relative", width: "0px", height: "0px",}} alt="" src="/subtract.svg" />
          <div style={{position: "absolute", top: "16px", left: "24px", borderRadius: "12px", backgroundColor: "#ffeb39", width: "60px", height: "60px",}} />
          <img style={{position: "absolute", height: "19.7%", width: "7.83%", top: "25%", right: "79.82%", bottom: "55.3%", left: "12.35%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
        </div>
      </div>
      <div style={{position: "absolute", top: "3349px", left: "1036px", width: "332px", height: "132px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "332px", height: "132px", overflow: "hidden",}}>
          <div style={{position: "absolute", top: "16px", left: "107px", fontSize: "18px", fontWeight: "500",}}>Pond Area</div>
          <div style={{position: "absolute", top: "61px", left: "107px", fontWeight: "500",}}>Total Energy consumed</div>
          <div style={{position: "absolute", top: "88px", left: "107px", fontWeight: "600",}}>20 kWh</div>
          <div style={{position: "absolute", top: "82px", left: "24px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "12px", color: "#fff",}}>
            <div style={{borderRadius: "5px", backgroundColor: "#3c3c43", border: "1px solid #3c3c43", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", padding: "8px",}}>
              <div style={{position: "relative",}}>3.3 KW</div>
            </div>
          </div>
          <div style={{position: "absolute", top: "22px", left: "299px", borderRadius: "50%", backgroundColor: "#33ff00", width: "15px", height: "15px",}} />
          <img style={{position: "relative", width: "0px", height: "0px",}} alt="" src="/subtract.svg" />
          <div style={{position: "absolute", top: "16px", left: "17px", borderRadius: "12px", backgroundColor: "#ffeb39", width: "60px", height: "60px",}} />
          <img style={{position: "absolute", height: "19.7%", width: "7.83%", top: "25%", right: "81.93%", bottom: "55.3%", left: "10.24%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
        </div>
      </div>
      <div style={{position: "absolute", top: "3496px", left: "1036px", width: "332px", height: "132px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "332px", height: "132px", overflow: "hidden",}}>
          <div style={{position: "absolute", top: "16px", left: "107px", fontSize: "18px", fontWeight: "500",}}>MLCP Floor 3</div>
          <div style={{position: "absolute", top: "61px", left: "107px", fontWeight: "500",}}>Total Energy consumed</div>
          <div style={{position: "absolute", top: "88px", left: "107px", fontWeight: "600",}}>20 kWh</div>
          <div style={{position: "absolute", top: "82px", left: "24px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "12px", color: "#fff",}}>
            <div style={{borderRadius: "5px", backgroundColor: "#3c3c43", border: "1px solid #3c3c43", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", padding: "8px",}}>
              <div style={{position: "relative",}}>11 KW</div>
            </div>
          </div>
          <div style={{position: "absolute", top: "22px", left: "299px", borderRadius: "50%", backgroundColor: "#33ff00", width: "15px", height: "15px",}} />
          <img style={{position: "relative", width: "57px", height: "57px",}} alt="" src="/subtract.svg" />
        </div>
      </div>
      {/* ----------------- */}
      <div style={{position: "absolute", top: "2891px", left: "341px", backgroundColor: "rgba(242, 242, 242, 0.8)", width: "461px", height: "252px",}} />
      <img style={{position: "absolute", top: "2922px", left: "880px", width: "510px", height: "3px", objectFit: "contain",}} alt="" src="/vector-4.svg" />
      <div style={{position: "absolute", top: "2657px", left: "345px", fontSize: "12px", fontWeight: "600",}}>IOE</div>
      <div style={{position: "absolute", top: "2613px", left: "341px", fontSize: "16px", fontWeight: "600",}}>Batteries</div>
      <div style={{position: "absolute", top: "3221px", left: "341px", fontSize: "16px", fontWeight: "600",}}>EV Chargers</div>
      <div style={{position: "absolute", top: "3313px", left: "345px", fontWeight: "600",}}>All Chargers</div>
      <div style={{position: "absolute", top: "2615px", left: "1346px",}}>Today</div>
      <div style={{position: "absolute", top: "2911px", left: "361px", fontSize: "10px",}}>Next Cycle</div>
      <div style={{position: "absolute", top: "2695px", left: "345px", width: "132px", height: "146px", fontSize: "16px", color: "#fff",}}>
        <img style={{position: "absolute", top: "0px", left: "0px", width: "132px", height: "146px",}} alt="" src="/group-153.svg" />
        <img style={{position: "absolute", top: "39px", left: "0px", width: "132px", height: "107px",}} alt="" src="/rectangle-56.svg" />
        <div style={{position: "absolute", top: "103px", left: "8px", fontWeight: "600",}}>80%</div>
        <div style={{position: "absolute", top: "127px", left: "8px", fontSize: "10px", fontWeight: "500",}}>600 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2759px", left: "375px", fontSize: "12px", color: "#fff",}}>Discharging</div>
      <div style={{position: "absolute", top: "2792px", left: "510px", width: "91px", height: "45px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Total Charge `}</div>
        <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>192 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2792px", left: "630px", width: "110px", height: "45px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Total Discharge `}</div>
        <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>240 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2729px", left: "510px",}}>Energy Saved</div>
      <div style={{position: "absolute", top: "2750px", left: "510px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100 kWh</div>
      <div style={{position: "absolute", top: "2729px", left: "630px", width: "80px", height: "48px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px",}}>Cost Saved</div>
        <div style={{position: "absolute", top: "24px", left: "0px", fontSize: "16px", color: "#18822d", fontFamily: "Inter",}}>
          <span style={{fontWeight: "600",}}>{`₹ `}</span>
          <span style={{fontWeight: "600", fontFamily: "Poppins",}}>380</span>
        </div>
      </div>
      <div style={{position: "absolute", top: "2677px", left: "880px", fontSize: "12px", fontWeight: "600",}}>LTO</div>
      <div style={{position: "absolute", top: "2940px", left: "880px", fontSize: "12px", fontWeight: "600",}}>UPS</div>
      <div style={{position: "absolute", top: "2716px", left: "880px", width: "132px", height: "145px", fontSize: "16px", color: "#fff",}}>
        <img style={{position: "absolute", top: "0px", left: "0px", width: "132px", height: "144.75px",}} alt="" src="/group-153.svg" />
        <div style={{position: "absolute", top: "87px", left: "0px", borderRadius: "0px 0px 10px 10px", background: "linear-gradient(180deg, #f4be00, #f4a100)", width: "132px", height: "58px",}} />
        <div style={{position: "absolute", top: "101px", left: "8px", fontWeight: "600",}}>40%</div>
        <div style={{position: "absolute", top: "125px", left: "8px", fontSize: "10px", fontWeight: "500",}}>300 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2780px", left: "935px", fontSize: "12px", color: "#adadad",}}>Idle</div>
      <div style={{position: "absolute", top: "2989px", left: "880px", width: "132px", height: "111px", fontSize: "16px", color: "#fff",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", width: "132px", height: "111px",}}>
          <img style={{position: "absolute", top: "0px", left: "0px", width: "132px", height: "111px",}} alt="" src="/group-153.svg" />
          <div style={{position: "absolute", top: "32px", left: "0px", borderRadius: "0px 0px 10px 10px", background: "linear-gradient(180deg, #69b931, #18822d)", width: "132px", height: "79px",}} />
          <div style={{position: "absolute", top: "65px", left: "8px", fontWeight: "600",}}>80%</div>
          <div style={{position: "absolute", top: "89px", left: "8px", fontSize: "10px", fontWeight: "500",}}>600 kWh</div>
        </div>
        <div style={{position: "absolute", top: "41px", left: "30px", fontSize: "12px",}}>Discharging</div>
      </div>
      <div style={{position: "absolute", top: "2812px", left: "1069px", width: "91px", height: "45px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Total Charge `}</div>
        <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>192 kWh</div>
      </div>
      <div style={{position: "absolute", top: "3061px", left: "1069px", width: "91px", height: "45px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Total Charge `}</div>
        <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>192 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2812px", left: "1209px", width: "110px", height: "45px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Total Discharge `}</div>
        <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>240 kWh</div>
      </div>
      <div style={{position: "absolute", top: "3061px", left: "1209px", width: "110px", height: "45px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Total Discharge `}</div>
        <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>240 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2749px", left: "1069px", width: "95px", height: "45px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px",}}>Energy Saved</div>
        <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2998px", left: "1069px", width: "95px", height: "45px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px",}}>Energy Saved</div>
        <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2749px", left: "1209px", width: "80px", height: "48px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px",}}>Cost Saved</div>
        <div style={{position: "absolute", top: "24px", left: "0px", fontSize: "16px", color: "#18822d", fontFamily: "Inter",}}>
          <span style={{fontWeight: "600",}}>{`₹ `}</span>
          <span style={{fontWeight: "600", fontFamily: "Poppins",}}>380</span>
        </div>
      </div>
      <div style={{position: "absolute", top: "2998px", left: "1209px", width: "80px", height: "48px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px",}}>Cost Saved</div>
        <div style={{position: "absolute", top: "24px", left: "0px", fontSize: "16px", color: "#18822d", fontFamily: "Inter",}}>
          <span style={{fontWeight: "600",}}>{`₹ `}</span>
          <span style={{fontWeight: "600", fontFamily: "Poppins",}}>380</span>
        </div>
      </div>
      <div style={{position: "absolute", top: "2911px", left: "613px", fontSize: "10px",}}>Previous Cycle</div>
      <div style={{position: "absolute", top: "2940px", left: "361px", width: "171px", height: "47px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Scheduled Charge Time</div>
        <div style={{position: "absolute", top: "26px", left: "0px",}}>Tomorrow, 15:00 hrs</div>
      </div>
      <div style={{position: "absolute", top: "2940px", left: "613px", width: "142px", height: "47px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Charge time</div>
        <div style={{position: "absolute", top: "26px", left: "0px",}}>26/12/2023, 15:00 hrs</div>
      </div>
      <div style={{position: "absolute", top: "3007px", left: "361px", width: "191px", height: "47px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Scheduled Discharge Time</div>
        <div style={{position: "absolute", top: "26px", left: "0px",}}>Tomorrow, 18:00 hrs</div>
      </div>
      <div style={{position: "absolute", top: "3007px", left: "613px", width: "142px", height: "47px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Discharge Time</div>
        <div style={{position: "absolute", top: "26px", left: "0px",}}>26/12/2023, 18:00 hrs</div>
      </div>
      <div style={{position: "absolute", top: "2657px", left: "725px", fontSize: "12px", color: "#5a5a5a",}}>Explore</div>
      <img style={{position: "absolute", top: "2658px", left: "773px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/fluentopen12regular.svg" />
      <div style={{position: "absolute", top: "2677px", left: "1326px", fontSize: "12px", color: "#5a5a5a",}}>Explore</div>
      <img style={{position: "absolute", top: "2678px", left: "1374px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/fluentopen12regular.svg" />
      <div style={{position: "absolute", top: "2940px", left: "1326px", fontSize: "12px", color: "#5a5a5a",}}>Explore</div>
      <img style={{position: "absolute", top: "2941px", left: "1374px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/fluentopen12regular.svg" />
      <img style={{position: "absolute", top: "2670px", left: "370px", width: "10px", height: "10px",}} alt="" src="/polygon-5.svg" />
      <img style={{position: "absolute", height: "0.54%", width: "1.39%", top: "80.61%", right: "57.08%", bottom: "18.85%", left: "41.53%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
      <img style={{position: "absolute", height: "0.54%", width: "1.39%", top: "80.61%", right: "74.93%", bottom: "18.85%", left: "23.68%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
      <img style={{position: "absolute", height: "0.54%", width: "1.39%", top: "82.5%", right: "74.93%", bottom: "16.96%", left: "23.68%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
      <img style={{position: "absolute", height: "0.54%", width: "1.39%", top: "82.5%", right: "57.08%", bottom: "16.96%", left: "41.53%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
      <div style={{position: "absolute", top: "3074px", left: "361px", width: "212px", height: "47px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Expected Energy at Discharge</div>
        <div style={{position: "absolute", top: "26px", left: "3.31px", width: "78.69px", height: "21px",}}>
          <div style={{position: "absolute", top: "0px", left: "17.69px",}}>600 kWh</div>
          <img style={{position: "absolute", height: "89.29%", width: "11.91%", top: "2.98%", right: "88.09%", bottom: "7.74%", left: "0%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
        </div>
      </div>
      <div style={{position: "absolute", top: "3074px", left: "613px", width: "144px", height: "47px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Energy at Discharge</div>
        <div style={{position: "absolute", top: "26px", left: "0px", width: "78.69px", height: "21px", color: "#ff7338",}}>
          <div style={{position: "absolute", top: "0px", left: "18.69px",}}>380 kWh</div>
          <img style={{position: "absolute", height: "89.29%", width: "11.91%", top: "2.98%", right: "88.09%", bottom: "7.74%", left: "0%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
        </div>
      </div>
      {/* ---------------- */}
      <div style={{position: "absolute", top: "2073px", left: "873px", width: "547px", height: "497px", fontSize: "16px", color: "#fff",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "547px", height: "497px",}} />
        <div style={{position: "absolute", top: "419px", left: "28px", fontSize: "24px", fontWeight: "600", color: "#2b2b2b",}}>16° C</div>
        <div style={{position: "absolute", top: "419px", left: "314px", fontSize: "24px", fontWeight: "600", color: "#2b2b2b",}}>7° kWh</div>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px 10px 0px 0px", background: "linear-gradient(180deg, #e17a1b, #fab87a)", width: "547px", height: "350px",}} />
        <div style={{position: "absolute", top: "36px", left: "32px", fontWeight: "600",}}>Hot Water Storage</div>
        <div style={{position: "absolute", top: "101px", left: "32px", fontSize: "14px", fontWeight: "500",}}>Energy Stored</div>
        <div style={{position: "absolute", top: "124px", left: "32px", fontWeight: "600",}}>55 kWh</div>
        <div style={{position: "absolute", top: "383px", left: "28px", fontWeight: "600", color: "#2b2b2b",}}>Stored Water Temperature</div>
        <div style={{position: "absolute", top: "383px", left: "314px", fontWeight: "600", color: "#2b2b2b",}}>Refrigerant Temperature</div>
        <img style={{position: "relative", width: "182.5px", height: "206.55px", mixBlendMode: "soft-light",}} alt="" src="/union.svg" />
        <img style={{position: "absolute", top: "211px", left: "387px", width: "120px", height: "96px", mixBlendMode: "soft-light",}} alt="" src="/rectangle-126.svg" />
        <div style={{position: "absolute", top: "208px", left: "387px", borderRadius: "50%", backgroundColor: "#faa75b", width: "120px", height: "7px",}} />
        <div style={{position: "absolute", top: "45px", left: "289px", width: "166px", height: "53px", fontSize: "12px",}}>
          <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #8d5ebc)", width: "166px", height: "53px", mixBlendMode: "normal",}} />
          <div style={{position: "absolute", top: "7px", left: "13px", fontWeight: "500",}}>Delivery Flow Rate</div>
          <div style={{position: "absolute", top: "27px", left: "13px", fontSize: "14px", fontWeight: "600",}}>12 m3/h</div>
        </div>
        <div style={{position: "absolute", top: "257px", left: "145px", width: "169px", height: "53px", fontSize: "12px",}}>
          <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #8d5ebc)", width: "169px", height: "53px", mixBlendMode: "normal",}} />
          <div style={{position: "absolute", top: "5.57px", left: "14px", fontWeight: "500",}}>Delivery Temperature</div>
          <div style={{position: "absolute", top: "22.29px", left: "14px", fontSize: "20px", fontWeight: "600",}}>27° C</div>
        </div>
        <div style={{position: "absolute", top: "14px", left: "473px", fontSize: "14px",}}>Today</div>
        <img style={{position: "absolute", top: "40px", left: "186px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/mdiinformationoutline.svg" />
      </div>
      {/* -------------------- */}
      <div style={{position: "absolute", top: "3202px", left: "686px", width: "718px", height: "87px", color: "#fff",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "rgba(242, 242, 242, 0.8)", width: "718px", height: "87px",}} />
        <div style={{position: "absolute", top: "12px", left: "490px", borderRadius: "5px", width: "213px", height: "63px", overflow: "hidden",}}>
          <div style={{position: "absolute", height: "100%", width: "100%", top: "0%", right: "0%", bottom: "0%", left: "0%", borderRadius: "10px", backgroundColor: "#0d0d0d",}} />
          <img style={{position: "absolute", height: "194%", width: "129.36%", top: "-47%", right: "17.74%", bottom: "-47%", left: "-47.09%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/rectangle.svg" />
          <img style={{position: "absolute", height: "194%", width: "129.36%", top: "-27.5%", right: "-47.09%", bottom: "-66.5%", left: "17.74%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%", objectFit: "contain",}} alt="" src="/rectangle.svg" />
          <img style={{position: "absolute", height: "194%", width: "129.36%", top: "147%", right: "16.82%", bottom: "-241%", left: "-46.18%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/rectangle.svg" />
          <img style={{position: "absolute", height: "194%", width: "129.36%", top: "-60.5%", right: "-47.09%", bottom: "-33.5%", left: "17.74%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%", objectFit: "contain",}} alt="" src="/rectangle.svg" />
          <div style={{position: "absolute", height: "152.38%", width: "45.54%", top: "-25.4%", right: "-22.54%", bottom: "-26.98%", left: "77%", borderRadius: "50%", backgroundColor: "#336671",}} />
          <div style={{position: "absolute", height: "77%", width: "89.91%", top: "11.5%", right: "5.2%", bottom: "11.5%", left: "4.89%", backgroundColor: "#989898", display: "none",}} />
          <img style={{position: "relative", width: "0px", height: "0px",}} alt="" src="/subtract.svg" />
          <img style={{position: "relative", width: "0px", height: "0px",}} alt="" src="/subtract.svg" />
          <img style={{position: "relative", width: "0px", height: "0px",}} alt="" src="/subtract.svg" />
          <div style={{position: "absolute", top: "14.29%", left: "9.39%", fontWeight: "500",}}>Total Energy Used</div>
          <div style={{position: "absolute", top: "47.62%", left: "9.39%", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
        </div>
        <div style={{position: "absolute", top: "12px", left: "264px", borderRadius: "5px", width: "213px", height: "63px", overflow: "hidden",}}>
          <div style={{position: "absolute", height: "100%", width: "100%", top: "0%", right: "0%", bottom: "0%", left: "0%", borderRadius: "5px", backgroundColor: "#030303",}} />
          <img style={{position: "absolute", height: "100%", width: "66.67%", top: "0%", right: "33.33%", bottom: "0%", left: "0%", borderRadius: "10px", maxWidth: "100%", overflow: "hidden", maxHeight: "100%", opacity: "0.1",}} alt="" src="/rectangle.svg" />
          <div style={{position: "absolute", height: "77%", width: "89.91%", top: "11.5%", right: "5.2%", bottom: "11.5%", left: "4.89%", backgroundColor: "#989898", display: "none",}} />
          <img style={{position: "absolute", height: "100%", width: "100%", top: "0%", right: "0%", bottom: "0%", left: "0%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%", opacity: "0.1",}} alt="" src="/rectangle-5.svg" />
          <img style={{position: "absolute", height: "100%", width: "84.1%", top: "100%", right: "15.9%", bottom: "-100%", left: "0%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%", opacity: "0.1",}} alt="" src="/rectangle-6.svg" />
          <img style={{position: "absolute", height: "100%", width: "92.35%", top: "0%", right: "7.65%", bottom: "0%", left: "0%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%", opacity: "0.01",}} alt="" src="/rectangle-7.svg" />
          <div style={{position: "absolute", top: "14.29%", left: "10.8%", fontWeight: "500",}}>Total Sessions Today</div>
          <div style={{position: "absolute", top: "47.62%", left: "10.8%", fontSize: "16px", fontWeight: "600",}}>20</div>
        </div>
        <div style={{position: "absolute", top: "12px", left: "16px", borderRadius: "5px", width: "235px", height: "63px", overflow: "hidden",}}>
          <div style={{position: "absolute", height: "100%", width: "100%", top: "0%", right: "0%", bottom: "0%", left: "0%", borderRadius: "5px", backgroundColor: "#0d0d0d",}} />
          <img style={{position: "absolute", height: "191.5%", width: "115.6%", top: "-54.5%", right: "8.87%", bottom: "-37%", left: "-24.46%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/group-8.svg" />
          <div style={{position: "absolute", height: "109.52%", width: "29.58%", top: "-4.76%", right: "-10.33%", bottom: "-4.76%", left: "80.75%", borderRadius: "50%", backgroundColor: "#4549b7",}} />
          <div style={{position: "absolute", height: "77%", width: "89.91%", top: "11.5%", right: "5.2%", bottom: "11.5%", left: "4.89%", backgroundColor: "#989898", display: "none",}} />
          <div style={{position: "absolute", width: "86.38%", top: "14.29%", left: "11.74%", fontWeight: "500", display: "inline-block",}}>{`Total No. of chargers `}</div>
          <div style={{position: "absolute", width: "9.39%", top: "47.62%", left: "11.74%", fontSize: "16px", fontWeight: "600", display: "inline-block",}}>06</div>
        </div>
      </div>
      <img style={{position: "absolute", height: "0.78%", width: "1.74%", top: "25.09%", right: "35.76%", bottom: "74.13%", left: "62.5%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
      <div style={{position: "absolute", top: "2850px", left: "345px", width: "132px", height: "25px", fontSize: "12px", color: "#adadad",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "4px", border: "1px solid #adadad", boxSizing: "border-box", width: "132px", height: "25px",}} />
        <div style={{position: "absolute", top: "4px", left: "8px", fontWeight: "500",}}>Capacity</div>
        <div style={{position: "absolute", top: "4px", left: "74px", fontWeight: "500",}}>800 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2870px", left: "880px", width: "132px", height: "25px", fontSize: "12px", color: "#adadad",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "4px", border: "1px solid #adadad", boxSizing: "border-box", width: "132px", height: "25px",}} />
        <div style={{position: "absolute", top: "4px", left: "8px", fontWeight: "500",}}>Capacity</div>
        <div style={{position: "absolute", top: "4px", left: "74px", fontWeight: "500",}}>800 kWh</div>
      </div>
      <div style={{position: "absolute", top: "3109px", left: "880px", width: "132px", height: "25px", fontSize: "12px", color: "#adadad",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "4px", border: "1px solid #adadad", boxSizing: "border-box", width: "132px", height: "25px",}} />
        <div style={{position: "absolute", top: "4px", left: "8px", fontWeight: "500",}}>Capacity</div>
        <div style={{position: "absolute", top: "4px", left: "74px", fontWeight: "500",}}>800 kWh</div>
      </div>

          {/* ------------- */}
      <div style={{position: "absolute", top: "2073px", left: "310px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "547px", height: "497px",}} />
      <div style={{position: "absolute", top: "2073px", left: "310px", borderRadius: "10px 10px 0px 0px", background: "linear-gradient(180deg, #003e9b, #35d2e7)", width: "547px", height: "348px",}} />
      <div style={{position: "absolute", top: "2492px", left: "338px", fontSize: "24px", fontWeight: "600",}}>7° C</div>
      <div style={{position: "absolute", top: "2190px", left: "562px", borderRadius: "5px", backgroundColor: "#d2d2d2", width: "76px", height: "28px", mixBlendMode: "soft-light",}} />
      <div style={{position: "absolute", top: "2305px", left: "563px", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #6c54ff 0.01%, #8d5ebc)", width: "76px", height: "24px",}} />
      <div style={{position: "absolute", top: "2267px", left: "563px", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #6c54ff 0.01%, #8d5ebc)", width: "76px", height: "24px",}} />
      <div style={{position: "absolute", top: "2230px", left: "563px", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #6c54ff 0.01%, #8d5ebc)", width: "76px", height: "24px",}} />
      <div style={{position: "absolute", top: "2192px", left: "561px", fontSize: "12px", lineHeight: "12px", fontWeight: "500", color: "#f9f9f9", textAlign: "center", display: "inline-block", width: "78px",}}>Not Available</div>
      <div style={{position: "absolute", top: "2232px", left: "586px", fontWeight: "600", color: "#fff",}}>11° C</div>
      <div style={{position: "absolute", top: "2269px", left: "586px", fontWeight: "600", color: "#fff",}}>9° C</div>
      <div style={{position: "absolute", top: "2307px", left: "587px", fontWeight: "600", color: "#fff",}}>7° C</div>
      <img style={{position: "absolute", top: "2308.27px", left: "689px", width: "17.76px", height: "17.76px", objectFit: "contain",}} alt="" src="/polygon-10.svg" />
      <img style={{position: "absolute", top: "2270.52px", left: "689px", width: "17.76px", height: "17.76px", objectFit: "contain",}} alt="" src="/polygon-11.svg" />
      <img style={{position: "absolute", top: "2232.76px", left: "689px", width: "17.76px", height: "17.76px", objectFit: "contain",}} alt="" src="/polygon-12.svg" />
      <img style={{position: "absolute", top: "2195px", left: "689px", width: "17.76px", height: "17.76px", objectFit: "contain",}} alt="" src="/polygon-13.svg" />
      <div style={{position: "absolute", top: "2108px", left: "342px", fontSize: "16px", fontWeight: "600", color: "#fff",}}>Cold Water Storage</div>
      <div style={{position: "absolute", top: "2456px", left: "338px", fontSize: "16px", fontWeight: "600",}}>Stored Water Temperature</div>
      <div style={{position: "absolute", top: "2456px", left: "592px", width: "106px", height: "75px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600", display: "inline-block", width: "106px", height: "39px",}}>Total Electrical Energy</div>
        <div style={{position: "absolute", top: "54px", left: "0px",}}>250 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2174px", left: "342px", width: "115px", height: "115px", color: "#fff",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Inlet Flow Rate</div>
        <div style={{position: "absolute", top: "22px", left: "0px",}}>250 kWh</div>
        <div style={{position: "absolute", top: "72px", left: "0px", fontWeight: "600",}}>Outlet Flow Rate</div>
        <div style={{position: "absolute", top: "94px", left: "0px",}}>250 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2456px", left: "732px", width: "116px", height: "75px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600", display: "inline-block", width: "116px",}}>Total Cooling Energy</div>
        <div style={{position: "absolute", top: "54px", left: "0px",}}>250 ckWh</div>
      </div>
      <img style={{position: "relative", width: "114px", height: "156px", mixBlendMode: "soft-light",}} alt="" src="/union.svg" />
      <img style={{position: "relative", width: "21.66px", height: "33.39px", mixBlendMode: "soft-light",}} alt="" src="/union.svg" />
      <img style={{position: "relative", width: "21.66px", height: "36px", objectFit: "contain", mixBlendMode: "soft-light",}} alt="" src="/union@2x.png" />
      <img style={{position: "relative", width: "114.02px", height: "20.04px", mixBlendMode: "soft-light",}} alt="" src="/union.svg" />
      <div style={{position: "absolute", top: "2321px", left: "714.1px", borderRadius: "50%", backgroundColor: "#31bbe4", width: "113px", height: "21px", mixBlendMode: "normal",}} />
      <div style={{position: "absolute", top: "2192px", left: "650px", fontSize: "16px", fontWeight: "600", color: "#fff",}}>T-4</div>
      <div style={{position: "absolute", top: "2230px", left: "651px", fontSize: "16px", fontWeight: "600", color: "#fff",}}>T-3</div>
      <div style={{position: "absolute", top: "2267px", left: "651px", fontSize: "16px", fontWeight: "600", color: "#fff",}}>T-2</div>
      <div style={{position: "absolute", top: "2305px", left: "653px", fontSize: "16px", fontWeight: "600", color: "#fff",}}>T-1</div>
      <div style={{position: "absolute", top: "2381px", left: "361px", fontWeight: "600", color: "#fff",}}>ON</div>
      <div style={{position: "absolute", top: "2385px", left: "342px", borderRadius: "50%", backgroundColor: "#33ff00", width: "12px", height: "12px",}} />
    </div>
    </div>
  )
}

export default DashBoardCombine
