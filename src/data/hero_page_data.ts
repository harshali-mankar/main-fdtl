import vims from "../assets/vims.png"
import flyx from "../assets/flyx.png"
import aero_duty_pro from "../assets/aero_duty_pro.png"

const heroPageData = [
  {
    image: "",
    link: "http://localhost:5174/",
    name: "Master",
    desc: ""
  }, {
    image: flyx,
    link: "http://flyx.fdtl.in/",
    name: "Aero Duty Pro FlyX",
    desc: "Flyx Dashboard is a centralized platform designed for managing charter flight operations and bookings efficiently. It provides a streamlined interface for handling trip requests, passenger details, flight scheduling, and operator coordination. Built with a user-first design, it ensures quick access to critical aviation workflows."
  }, {
    image: aero_duty_pro,
    link: "http://trainx.fdtl.in/",
    name: "Crew TrainX",
    desc: ""
  }, {
    image: vims,
    link: "https://vims-ui.kraftnexus.in",
    name: "Vims",
    desc: "This is a Vehicle Inspection Management System (VIMS) platform. It supports digital inspection workflows for vehicles, allowing users to manage inspections, track status, and generate reports. The UI is structured for operational efficiency, likely intended for garages, logistics, or fleet maintenance teams."
  }
]

export {
  heroPageData
}