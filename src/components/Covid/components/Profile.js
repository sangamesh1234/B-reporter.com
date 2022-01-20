import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardFooter, CardHeader} from 'reactstrap';
import '../css/Profile.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import EditIcon from '@material-ui/icons/Edit';

class Profile extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div style={{margin: "100px auto"}}>
                <Card className="user-profile">
                    <CardHeader>My Profile</CardHeader>
                    <CardImg>{/*UserImage*/}</CardImg>
                    <CardBody>
                        Username<br/>
                        {/* Gender and Age<br/> */}
                        <LocationOnIcon /> Location<br/>
                        <EmailIcon /> Email<br/>
                        <PhoneIcon /> Phone Number 
                    </CardBody>
                    <CardFooter>
                        <EditIcon /> Edit 
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default Profile;