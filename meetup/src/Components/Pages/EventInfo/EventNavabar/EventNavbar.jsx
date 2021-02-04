import React from 'react'
import Styles from './EventNavbar.module.css'
import { AiOutlineStar } from "react-icons/ai";
import { Modal, Button } from 'antd';
import {AiFillCheckCircle } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { FaFacebookSquare,FaTwitter,FaLinkedin} from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { putAttendeeData } from '../../../../Redux/EventInformationRedux/action';

const EventNavbar = ({id ,attendees,img ,header , date}) => {
    const [modalVisible , setModalVisible] = React.useState(false)
    const [isGoing , setIsGoing] = React.useState(false)
    const dispatch = useDispatch();
    console.log(attendees , id)
    const handleClick = () => {
        setModalVisible(true)
        isGoing === true ? setIsGoing(false) : setIsGoing(true)
        if(!isGoing){
            const signUp = JSON.parse(localStorage.getItem("signUpInfo"))
            const {name} = signUp[signUp.length -1]
            const attendeeData = {
                name,
            }
            attendees = [...attendees,attendeeData]
            dispatch(putAttendeeData(id,attendees))
        }
        else{
            attendees.pop();
            dispatch(putAttendeeData(id,attendees))
        }
    }

    
    return (
        <div className = {Styles.eventInfo__navabar_container}>
            <div >
                <p>{date}</p>
                <h3>{header}</h3>
            </div>
            <div style = {{display : "flex" ,justifyContent : "space-between"}}>
                <div style = {{fontSize : "18px" , fontWeight : "600"}}>Free</div>
                <div className = {Styles.eventInfo__navbar_star_icon}>
                    <AiOutlineStar style = {{fontSize : "20px",color : "grey" }}/>
                </div>
                <Button className = {Styles.eventInfo__navbar_attend_online_button} onClick={handleClick}>
                   {isGoing ? "Don't wanna go" : "Attend Online"}
                </Button>
                <p style = {{marginLeft : "30px" , color : "grey" , marginTop : "10px"}}>{isGoing ? "Edit RSVP":"" }</p>
                <Modal className = {Styles.eventInfo__navbar_modal}
                   
                    centered
                    visible={modalVisible}
                    onOk={() => setModalVisible(false)}
                    onCancel={() => setModalVisible(false)}
                    footer={null}>
                        <div style = {{display : 'flex' , flexDirection : "column" , alignItems : "center" , justifyContent : "center" , lineHeight : "35px",textAlign : "center"}}>
                            <img className = {Styles.eventInfo__host_image} src = {img} alt = "attende"/>
                            <br/>
                            <span style = {{fontSize : "28px" , fontWeight : "700" , padding : "20px 30px"}}>{header}</span>
                        </div>
                        <p style = {{marginLeft : "50px"}}>If anything changes just update your response.</p>
                        <p style = {{marginLeft : "70px"}}>It helps host to prepare and its polite :) .</p>  
                        <div className = {Styles.addToCalenderDiv}>Add To Calender</div>  
                        <div className = {Styles.response_div}>
                            <div style = {{display : "flex",alignItems : "baseline",color : "#00D480"}}>
                                {isGoing ? <AiFillCheckCircle style = {{fontSize : "20px",marginTop : "10px"}}/>
                                 : <ImCross style = {{fontSize : "20px",marginTop : "10px" ,color : "red"}}/>}
                                
                                <p style = {{marginLeft : "10px"}}>{isGoing ? "Your response : Going" : "Your response : Not Going"}</p>
                                <br/>
                                
                            </div>
                            
                            <h3 style = {{marginLeft : "10px"}}>{header}</h3>
                            <h3 style = {{marginLeft : "10px"}}>Event Date and Time: {date}</h3>
                            <div style = {{display : "flex" , justifyContent : "space-evenly",width : "100px",marginTop : "20px" }}>
                                <FaFacebookSquare style = {{fontSize : "20px"}} />
                                <FaTwitter style = {{fontSize : "20px"}}/>
                                <FaLinkedin style = {{fontSize : "20px"}}/>
                            </div>
                        </div>
                </Modal>
            </div>
        </div>
    )
}

export {EventNavbar}
