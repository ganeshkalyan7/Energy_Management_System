import React from "react";
import "./AlertDashboard.css";
import { Link } from "react-router-dom";

function AlertDashboard() {
  return (
    <div>
      <div className="Alerts">
        <div>
          <p className="heading">Subscribed Alerts</p>
        </div>
        <div className="alerts-available">
          <Link to="/" className="battery">
            Battery Operations
          </Link>
          <Link to="/" className="cooling">
            Cooling Temparature
          </Link>
          <Link to="/" className="peak">
            Peak Demand
          </Link>
          <Link to="/" className="data">
            Data Loss
          </Link>
        </div>
      </div>

      <div className="Alerts">
        <div className="alertdetails">
          <div className="alertname">
            <Link to="/" className="battery">
              Battery Operations
            </Link>
            <div>⚠ Medium severity</div>
          </div>
          <div className="alertdate">
            <div>⌚12:49</div>
            <div>📅17/05/2025</div>
          </div>
        </div>

        <div className="reson">
          <div>
            <div>Reson</div>
            <div className="highlight">Voltage Limit 417</div>
          </div>
          <div>
            <div>System</div>
            <div className="highlight">LTO Battery OFF</div>
          </div>
        </div>

        <div className="contactalert">
          <div>Contact : Battery Team</div>
          <Link to="/" className="cooling">
            View Dashboard
          </Link>
        </div>
      </div>

      <div className="Alerts">
        <div className="alertdetails">
          <div className="alertname">
            <Link to="/" className="data">
              Data Loss
            </Link>
            <div>⚠ Low severity</div>
          </div>
          <div className="alertdate">
            <div>⌚12:49</div>
            <div>📅17/05/2025</div>
          </div>
        </div>

        <div className="reson">
          <div>
            <div>Reson</div>
            <div className="highlight">Voltage Limit 417</div>
          </div>
          <div>
            <div>System</div>
            <div className="highlight">LTO Battery OFF</div>
          </div>
        </div>

        <div className="contactalert">
          <div>Contact : Battery Team</div>
          <Link to="/" className="batterys">
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AlertDashboard;
