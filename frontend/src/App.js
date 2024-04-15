import React, { useState,useEffect } from 'react';
import './App.scss';  
import 'react-calendar/dist/Calendar.css';
import AppCalendar from './component/calender/Calender';
import SelectField from './component/form-component/select/SelectField';
import HomeFeb from './assets/images/home_feb.png';
import CalenderIcon from './assets/images/calendar.png';
import BluePhoneIcon from './assets/images/Blue_Phone_Icon.png';
import InputField from './component/form-component/input/InputField';
import TextAreaField from './component/form-component/textarea/TextAreaField';
import AppModal from './component/modal/AppModal';
import { useDispatch, useSelector } from 'react-redux';
import {fetchData} from "./store/api/Api"

function App() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);
  

  const serviceOptions = [
    { value: 'Residential', label: 'Residential Air Duct Cleaning' },
    { value: 'Commercial', label: 'Commercial Air Duct Cleaning' },
    { value: 'Insulation', label: 'Insulation' },
    { value: 'Aeroseal', label: 'Duct Sealing Powered by Aeroseal' },
    { value: 'DuctArmor', label: 'Duct Lining Powered by Duct Armor' }
  ];
  const resuduleOption = [
    {value: '', label: 'Are you rescheduling an existing appointment?'},
    {value: 'YES', label: 'Yes'},
    {value: 'NO', label: 'No'}
  ];
  const [formatedDate,setFormatedDate]  = useState("");
  const numberFurnanceOption = [
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3+', label: '3+'}
  ];
  const locationOption = [
    {value: 'Basement', label: 'Basement'},
    {value: 'Crawl Space', label: 'Crawl Space'},
    {value: 'Slab', label: 'Slab'},
    {value: 'Unknown', label: 'Unknown'},
  ];
  const yesNoOption = [
    {value: 'Y', label: 'Yes'},
    {value: 'N', label: 'No'}
  ];
  const exitPointDryerOption = [
    {value:'0-10 Feet Off the Ground',label:'0-10 Feet Off the Ground'},
    {value:'10+ Feet Off the Ground',label:'10+ Feet Off the Ground'},
    {value:'Rooftop',label:'Rooftop'},
  ];
  const [service,setService] = useState(''); 
  const [userFormData,setUserFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    address: '',
    phone: '',
    email: '',
    source: '',
    addCancelledList: ''
  });
  const [bookingTime,setBookingTime] = useState('');
  const [title,setTitle] = useState('SELECT A PREFERRED DATE AND TIME FOR DUCT CLEANING APPOINTMENT')
  const [residentialAirDuctCleaning, setResidentialAirDuctCleaning] = useState({ 
    existingAppointment: '',
    area: '',
    numberOfFurnace: '',
    location: '',
    addDryerVent: '',
    dryer_vent_exit_point: ''
  });
  const [commercialAirDuctCleaning, setCommercialAirDuctCleaning] = useState({
    businessName: '',
    buildingSize: '',
    totalRoofTopOrFurnace: '',
    whyAirDuctCleaning: '' 
  });
  const insulateOption = [
    {value: 'attic', label: 'Attic'},
    {value: 'basement', label: 'Basement'},
    {value: 'walls', label: 'Walls'},
    {value: 'ceiling', label: 'Ceiling'},
    {value: 'crawl_space', label: 'Crawl Space'},
    {value: 'garage', label: 'Garage'},
    {value: 'other', label: 'Other'}
  ];

  const [timeOption,setTimeOption] = useState([
    {value:"8.00 AM - 9:00 AM", label: "Arrival Window \n 8:00 AM - 9:00 AM (EST)"},
    {value:"11.00 AM - 1:00 PM", label: "Arrival Window \n 11:00 AM - 1:00 PM (EST)"},
    {value:"1.00 PM - 4:00 PM", label: "Arrival Window \n 1:00 AM - 4:00 AM (EST)"},
  ]);

  const experienceOption = [
    {value: "hot_Cold_room", label: "Hot/Cold Rooms"},
    {value: "energy_savings", label: "Energy Savings"},
    {value: "old_insulation", label: "Old Insulation"},
    {value: "animal_damage", label: "Animal Damage"},
    {value: "new_construction", label: "New Construction"},
    {value: "other", label: "Other"}
  ];

  const [priceData,setPriceData] = useState({
    isDryVentPrice: false,
    dryVentPrice: 0,
    isAirDuctPrice: false,
    airDuctPrice: 0
  });

  const [insulation,setInsulation] = useState({
    existingAppointment: '',
    insulate: '',
    experience: ''
  });
  const [ductSealing, setDuctSealing] = useState({
    existingAppointment: '',
    area: '',
    numberOfFurnace: '',
    location: '',
    experience: ''
  }); 
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isContact, setContact] = useState(false); 

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); 
    setFormatedDate(formatDate(date));
  };

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit form
  };

  const handleServiceChange = (e)=>{
    const ser = e.target.value;
    setService(ser);
    if(ser=="Commercial"){
      setTitle("SELECT A PREFERRED DATE AND TIME FOR COMMERCIAL APPOINTMENT");
      updateBookingOptionWithAfternoon();
    }else if(ser=="Insulation"){
      setTitle("SELECT A PREFERRED DATE AND TIME FOR INSULATION APPOINTMENT");
      updateBookingOptionWithoutEvening();
    }else if(ser=="Aeroseal"){
      setTitle("SELECT A PREFERRED DATE AND TIME FOR DUCT SEALING POWERED BY AEROSEAL APPOINTMENT");
      updateBookingOptionWithoutEvening();
    }else if(ser=="DuctArmor"){
      setTitle("SELECT A PREFERRED DATE AND TIME FOR DUCT LINING POWERED BY DUCTARMOR APPOINTMENT");
      updateBookingOptionWithoutEvening();
    }else{
      setTitle("SELECT A PREFERRED DATE AND TIME FOR DUCT CLEANING APPOINTMENT");
      updateBookingOptionWithWindows(); 
    } 
    if(ser=="Commercial"){
      setIsOpen(true);
    }else{
      setIsOpen(false);
    }
  }

  const updateBookingOptionWithWindows= ()=> {
    setTimeOption([
      {value:"8.00 AM - 9:00 AM", label: "Arrival Window \n 8:00 AM - 9:00 AM (EST)"},
      {value:"11.00 AM - 1:00 PM", label: "Arrival Window \n 11:00 AM - 1:00 PM (EST)"},
      {value:"1.00 PM - 4:00 PM", label: "Arrival Window \n 1:00 AM - 4:00 AM (EST)"},
    ])
  }

  const updateBookingOptionWithAfternoon=()=>{
    setTimeOption([
      {value:"Morning", label: "Morning"},
      {value:"Afternoon", label: "Afternoon"},
      {value:"Evening", label: "Evening"},
    ])
  }

  const updateBookingOptionWithoutEvening=()=>{
    setTimeOption([
      {value:"Morning", label: "Morning"},
      {value:"Afternoon", label: "Afternoon"} 
    ])
  }

  const handleUserDataChange  = (e)=>{
    const {name, value} = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value
    })
  }

  const handleDuctSealingChange = (e)=>{
    const {name, value} = e.target;
    if(name=="numberOfFurnace" && value=="3+"){
      setIsOpen(true);
      setContact(true)
    }else{
      if(name=="numberOfFurnace"){
        setIsOpen(false);
        setContact(false)
      }
    }
    setDuctSealing({
      ...ductSealing,
      [name]: value
    })
  }

  const handleCommercialAirDuctCleaning = (e)=>{
    const {name, value} = e.target;
    setCommercialAirDuctCleaning({
      ...commercialAirDuctCleaning,
      [name]: value
    })
  }

  const handleResidentialAirDuctCleaningChange = (e)=>{
    const {name, value} = e.target; 
    if(name=="numberOfFurnace" && value=="3+"){
      setIsOpen(true);
      setContact(true)
    }else{
      if(name=="numberOfFurnace" || name=="dryer_vent_exit_point"){
        setIsOpen(false);
        setContact(false);
        getData(value, residentialAirDuctCleaning.dryer_vent_exit_point);
      }
      
    }
    setResidentialAirDuctCleaning({
      ...residentialAirDuctCleaning,
      [name]: value
    });
    
  }

  const handleInsulationChange = (e)=>{
    const {name, value} = e.target; 
    setInsulation({
      ...insulation,
      [name]: value
    })
  }

  const handlePhoneKeyUp = (e)=>{
    let phoneNumber = e.target.value;
    phoneNumber = phoneNumber.replace(/[^\d]/g, "")
		.replace(/(\d{3}(?=\d))((\d{3}(?=\d))|(\d{0,3}$))((\d{4}(?=\d))|(\d{0,4}$))/,
			function (m, $1, $2, $3, $4, $5, $6, $7) {
				return (($1) ? $1 + '-' : m) +
					(($3) ? $3 + '-' : $4) +
					(($6) ? $6 + '-' : $7);
		});
    setUserFormData({
      ...userFormData,
      phone: phoneNumber
    })
  }

  const handlePaste = (event) => {
    event.preventDefault();  
  } 

  const handleBookingTime = (event) => {
    console.log(event.target)
      setBookingTime(event.target.value)
      console.log(bookingTime)
  }

  const getData = (numberOfFurnace, dryer)=>{
    if(dryer!="" && numberOfFurnace!=""){
      dispatch(fetchData({
        no_of_furnace: numberOfFurnace,
        dryer_vent_exit_point: dryer
      }));
    }else if(numberOfFurnace!=""){
      dispatch(fetchData({
        no_of_furnace: numberOfFurnace 
      }));
    }else if(dryer!=""){
      dispatch(fetchData({ 
        dryer_vent_exit_point: dryer
      }));
    }
    
  }

  useEffect(() => {
    if(data){
      if(data.data.dryerVent){
        let dryVentPrice = data.data.dryerVent.price;
        setPriceData({
          ...priceData,
          isDryVentPrice: true,
          dryVentPrice: dryVentPrice 
        })
      }
      if(data.data.airDuct){
        let airDuctPrice = data.data.airDuct.price;
        setPriceData({
          ...priceData,
          isAirDuctPrice: true,
          airDuctPrice: airDuctPrice 
        })
      }
    }
  }, [dispatch, data]);

  return (
    <div className='container appointment mb-5'>
      <div className='row'>
        <h1 className='text-center'>Receive a free quote and schedule online today!</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='row'>

        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mt-3 mb-5 form-title'>
              <h3><img src={HomeFeb} alt='Not Found'/>GET A QUOTE OR SCHEDULE NOW!</h3>
            </div>
            <div className='form'>
              <div className='mb-3'>
                <div className='mb-3'>
                  <SelectField value={service} options={serviceOptions} onChange={handleServiceChange} placeholder="Servce Needed *" required="required" />
                </div>
                <div className='row mb-3'>
                  <div className='col-md-6'>
                    <InputField type="text" name="firstName" value={userFormData.firstName} onChange={handleUserDataChange} placeholder="First Name *" required="required" />
                  </div>
                  <div className='col-md-6'>
                    <InputField type="text" name="lastName" value={userFormData.lastName} onChange={handleUserDataChange} placeholder="Last Name *" required="required"  />
                  </div>
                </div>
                <div className='mb-3'>
                  <InputField type="text" name="city" value={userFormData.city} onChange={handleUserDataChange} placeholder="City *" required="required"  />
                </div>
                <div className='mb-3'>
                  <InputField type="text" name="state" value={userFormData.state} onChange={handleUserDataChange} placeholder="State *" required="required"  />
                </div>
                <div className='mb-3'>
                  <TextAreaField name="address" value={userFormData.address} onChange={handleUserDataChange} placeholder="Address *" required="required"/>
                </div>
                <div className='mb-3'>
                  <InputField type="text" name="phone" value={userFormData.phone} onKeyUp={handlePhoneKeyUp} onChange={handleUserDataChange} placeholder="Phone *" 
                    required="required" maxLength="12" pattern=".{12,}"  onPaste={handlePaste} onDrop={handlePaste} autoComplete="off" 
                    title="Require 10 digit mobile number"  />
                </div>
                <div className='mb-3'>
                  <InputField type="email" name="email" value={userFormData.email} onChange={handleUserDataChange} placeholder="Email *" required="required"  />
                </div>
                <div className='mb-3'>
                  <TextAreaField name="source" value={userFormData.source} onChange={handleUserDataChange} placeholder="How did you first hear about Amistee? *" required="required"  />
                </div>
                {
                  (service=="" || service=="Residential") &&
                  <>
                    <div className='mb-3'>
                      <SelectField name="existingAppointment" value={residentialAirDuctCleaning.existingAppointment} key="existingAppointment" options={resuduleOption} onChange={handleResidentialAirDuctCleaningChange} placeholder="" />
                    </div>
                    <div className='mb-3'>
                      <InputField type="number" name="area" value={residentialAirDuctCleaning.area} required="required" placeholder="Approx. Sq. Footage of Living Space (Not Including Basement) *" onChange={handleResidentialAirDuctCleaningChange} />
                    </div>
                    <div className='mb-3'>
                      <SelectField name="numberOfFurnace" key="numberOfFurnace" value={residentialAirDuctCleaning.numberOfFurnace} options={numberFurnanceOption} onChange={handleResidentialAirDuctCleaningChange} placeholder="Select Number of Furnace *" required="required" />
                    </div>
                    <div className='mb-3'>
                      <SelectField name="location" value={residentialAirDuctCleaning.location} options={locationOption} onChange={handleResidentialAirDuctCleaningChange} placeholder="Select Location of your Furnace *" required="required" />
                    </div>
                    <div className='mb-3'>
                      <SelectField name="addDryerVent" key="addDryerVent" value={residentialAirDuctCleaning.addDryerVent} options={yesNoOption} onChange={handleResidentialAirDuctCleaningChange} placeholder="Add Dryer Vent Cleaning? *" required="required" />
                    </div>
                    {
                      residentialAirDuctCleaning.addDryerVent=="Y" && 
                      <div className='mb-3'>
                        <SelectField name="dryer_vent_exit_point" value={residentialAirDuctCleaning.dryer_vent_exit_point} options={exitPointDryerOption} onChange={handleResidentialAirDuctCleaningChange} placeholder="Exit Point of your Dryer Vent? *" />
                      </div>
                    }

                  </>
                }
                {
                  service == "Commercial" && 
                  <>
                    <div className='mb-3'>
                      <InputField type="text" name="businessName" value={commercialAirDuctCleaning.businessName} onChange={handleCommercialAirDuctCleaning} placeholder="Business Name *" />
                    </div>
                    <div className='mb-3'>
                      <InputField required="required" placeholder="Building sq ft size *" value={commercialAirDuctCleaning.buildingSize} name="buildingSize" onChange={handleCommercialAirDuctCleaning} type="number" />
                    </div>
                    <div className='mb-3'>
                      <TextAreaField name="totalRoofTopOrFurnace" placeholder="Do you have roof top units or furnaces and how many? *" value={commercialAirDuctCleaning.totalRoofTopOrFurnace} onChange={handleCommercialAirDuctCleaning} required="required" />
                    </div>
                    <div className='mb-3'>
                      <TextAreaField name="whyAirDuctCleaning" value={commercialAirDuctCleaning.whyAirDuctCleaning} required="required" placeholder="Why are you looking to have the air ducts cleaned?*" onChange={handleCommercialAirDuctCleaning} />
                    </div>
                  </>
                }
                {
                  service == "Insulation" && 
                  <>
                    <div className='mb-3'>
                      <SelectField options={yesNoOption} placeholder="Are you rescheduling an existing appointment?" name="existingAppointment" value={insulation.existingAppointment} onChange={handleInsulationChange} /> 
                    </div>
                    <div className='mb-3'>
                      <SelectField options={insulateOption} placeholder="What area are you looking to insulate? *" value={insulation.insulate} name="insulate" onChange={handleInsulationChange} required="required" />
                    </div>
                    <div className='mb-3'>
                      <SelectField options={experienceOption} placeholder="Are you experiencing any of the following? *" value={insulation.experience} name="experience" onChange={handleInsulationChange} required="required" />
                    </div>
                  </>
                }
                {
                  (service == "Aeroseal" || service=="DuctArmor") && 
                  <>
                    <div className='mb-3'>
                      <SelectField name="existingAppointment" value={ductSealing.existingAppointment} key="existingAppointment" options={resuduleOption} onChange={handleDuctSealingChange} placeholder="" />
                    </div>
                    <div className='mb-3'>
                      <InputField type="number" name="area" value={ductSealing.area} required="required" placeholder="Approx. Sq. Footage of Living Space (Not Including Basement) *" onChange={handleDuctSealingChange} />
                    </div>
                    <div className='mb-3'>
                      <SelectField name="numberOfFurnace" required="required" key="numberOfFurnace" value={ductSealing.numberOfFurnace} options={numberFurnanceOption} onChange={handleDuctSealingChange} placeholder="Select Number of Furnace *" />
                    </div>
                    <div className='mb-3'>
                      <SelectField name="location" value={ductSealing.location} options={locationOption} onChange={handleDuctSealingChange} placeholder="Select Location of your Furnace *" required="required" />
                    </div>
                    <div className='mb-3'>
                      <SelectField value={ductSealing.experience} name="experience" options={experienceOption} onChange={handleDuctSealingChange} placeholder="Are you experiencing any of the following? *" required="required" /> 
                    </div>
                  </>
                }
                <div className='mb-3'>
                  <div className='form-group'>
                    <input className='form-check-input' id="addCancel" onChange={handleUserDataChange} name='addCancelledList' type='checkbox'/>
                    <label className='form-check-label' htmlFor="addCancel">&nbsp;&nbsp;&nbsp;If possible, I'd like an earlier appointment. Please add me to the cancellation list.</label>
                  </div>
                  {
                    isContact && 
                    <div className='mt-3'>
                      <p>FOR 3 OR MORE FURNACES OR FOR EARLIER APPOINTMENTS EMAIL INFO@AMISTEE.COM OR CALL 877.349.8877</p>
                    </div>
                  }
                  {
                    (!isContact && (service=="Residential" || service=="")) && 
                    <div className='mt-3'>
                      <div className='quote-div'>
                        <h2 className='text-uppercase text-quote'>Your Quote</h2>
                        <h3 className='text-blue text-uppercase'>
                          AIR DUCT CLEANING QUOTE: $ {
                              priceData.isAirDuctPrice && `${priceData.airDuctPrice}`
                            }
                        </h3>
                        {
                          residentialAirDuctCleaning.addDryerVent=='Y' &&
                          <h3 className='text-blue text-uppercase'>
                            Dryer Vent Cleaning Quote: $ {
                              priceData.isDryVentPrice && `${priceData.dryVentPrice}`
                            }
                          </h3>
                        }
                        <h3 className='text-blue text-uppercase'>
                          Total: $ {
                              priceData.isAirDuctPrice && `${priceData.airDuctPrice+priceData.dryVentPrice}`
                            }
                        </h3>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div>

            </div>
          </div>
          <div className='col-md-6'>
            <div className='mt-3 mb-3 form-title'>
              <h3 className='text-center'><img src={CalenderIcon} alt='Not Found' />{title}</h3>
            </div>
            <div className='mb-4'>
              <div className='row justify-content-space-around'>
                {
                  timeOption.map((time,index)=><div className='col-md-4' key={index}>
                    <button  type='button' onClick={handleBookingTime} style={time.value==bookingTime ? {background: `rgb(0,128,0)`} :{}} value={time.value} className='btn btn-primary w-100'>{
                              time.label.split("\n").map((t,index1)=>{
                                return <React.Fragment key={index1}>{t}
                                <br /></React.Fragment>
                              })
                            }</button>
                  </div>)
                } 
              </div>
            </div>
            <AppCalendar selectedDate={selectedDate} onDateChange={handleDateChange} />
            <div className='mb-3 mt-5 form-title'>
              <h4 className='selectedTime'>Your Selected <br/>Date and Time:&nbsp;<span id="selectedDate">{formatedDate}</span><span id="selectedTime">&nbsp;&nbsp;{bookingTime}</span></h4>
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <button type='submit' className='btn btn-success' >Request Appointment</button>
        </div>
      </form>
      <AppModal isOpen={isOpen} onClose={handleCloseModal} closeButtonText="OK">
        <div className='row'>
          <div className='text-center'>
            <img src={BluePhoneIcon} alt='Image not found' className='phone-icon' />
            <h2 className='text-green mt-2'>Give us a call!</h2>
            <p className='text-center mt-3'>
              {
                isContact ? "Thank you for considering Amistee! For air duct cleaning estimates, please give our office a call at (248) 349-8877. Thank You!" 
                 :"Thank you for considering Amistee! For commercial air duct cleaning estimates, please give our office a call at (248) 349-8877. Thank You!"
                
              }
            </p>
          </div>
        </div>
      </AppModal>
    </div>
  );
}

export default App;
