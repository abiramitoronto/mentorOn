import React from "react";
import './Bookmentor.css';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Bookmentor() {

const param = useLocation();
const user  = param.state;
const student = param.student;
console.log("Student",student);

function bookSession(user_id, mentor_id, month, year) {
  axios.post('/api/booksession', {
    user_id,
    mentor_id,
    month,
    year
  }).then(() => {
    console.log("BookSession")
  })
}

  return (

 <>
    <div className="sessions">
    <h2>Booking Sessions With {user.name}</h2>
    </div>
    <div className="sessions">
          <img className="book--avatar" src={user.image_url}/>
          <div className="bookmonth">
            <p>Select Month :</p>
             <select name="months" id="months">
               <option value="Mar">Mar</option>
               <option value="Apr">Apr</option>
              </select>
           </div>

           <div className="bookyear">
             <p>Select Year :</p>
             <select name="year" id="year">
               <option value="2022">2022</option>
               <option value="2023">2023</option>
              </select>
           </div>
      </div>

    <form onSubmit={(event) => {
        event.preventDefault();
        console.log("Form")}}>
    <div className="payment-page">
    <div className="container">
      <h3>Confirm Your Payment</h3><br/>
      <div className="first-row">
        <div className="owner">
          <h>Owner</h>
          <div className="input-field">
            <input type="text" />
          </div>
        </div>

        <div className="CVV">
          <h>CVV</h>
          <div className="input-field">
            <input type="password" />
          </div>
        </div>

      </div>
      <div className="second-row">
        <div className="card-number">
          <h>Card Number</h>
          <div className="input-field">
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="third-row">
         <h>Expiration Date</h>
         <div className="selection">
           <div className="date">
             <select name="months" id="months">
             <option value="Month">Month</option>
               <option value="Jan">Jan</option>
               <option value="Feb">Feb</option>
               <option value="Mar">Mar</option>
               <option value="Apr">Apr</option>
               <option value="May">May</option>
               <option value="Jun">Jun</option>
               <option value="Jul">Jul</option>
               <option value="Aug">Aug</option>
               <option value="Sep">Sep</option>
               <option value="Oct">Oct</option>
               <option value="Nov">Nov</option>
               <option value="Dec">Dec</option>
              </select>
              <select name="years" id="years">
              <option value="Year">Year</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
             <div className="cards">
                <img src="https://w7.pngwing.com/pngs/32/363/png-transparent-visa-master-card-and-american-express-mastercard-payment-visa-credit-card-emv-credit-card-visa-and-master-card-background-text-display-advertising-logo.png" alt="" />
             </div>
        </div>
    </div>
    <button  name="submit" className="book-btn" onClick={bookSession}>Confirm</button>
    <button  name="submit" className="book-btn">Cancel</button>
  </div>
  </div>
  </form>
  </>

  )
}
