import React, {Component } from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import "../css/Widget.css";


class Widget extends Component{
  	constructor(props){
		super(props)
		this.state = {
			Ureported : null,
			Avg_Ctvalue : null,
			viewMore : false
		}
		this.handleViewMore = this.handleViewMore.bind(this);
  }
  async componentWillMount(){

  }
  handleViewMore = () =>{
	  console.log(this.state.viewMore);
	  var value = this.state.viewMore;
	  this.setState({
		  viewMore : !value
	  });
  }
  render(){
  return (
      	<div className="widget">
			<div className="widget__header">
				<h5>Spaces you may find useful</h5>
			</div>
			<div className="widget__contents">
				<div className="widget__content">
					<img
					src="./assets/Images/stats.png"
					alt="" className="widget__image"
					/>
					<div className="widget__contentTitle">
						<h5>Statatics</h5>
						<p>User information analysis</p>
					</div>
				</div>
				{!this.state.viewMore ?
					<div className="widget__expand_icon" onClick={this.handleViewMore}>
						<ExpandMoreIcon />
					</div>
					:<div>
						{/* <div className="widget__content">
							<img
							src="./assets/Images/pie.png"
							alt="" className="widget__image"
							/>
							<div className="widget__contentTitle">
								<h5>Solution</h5>
								<p>User information analysis</p>
							</div>
						</div>
						<div className="widget__expand_icon" onClick={this.handleViewMore}>
							<ExpandLessIcon />
						</div> */}
						<img
							src="./assets/Images/pie.png"
							alt="" className="widget__image_stat"
						/>
						<div className="widget__expand_icon" onClick={this.handleViewMore}>
							<ExpandLessIcon />
						</div>
					</div>
				}
				{/* <div className="widget__content">
					<img
					src="https://qphs.fs.quoracdn.net/main-thumb-ti-1737435-100-jxcfmjdvwvpkcketifttdmeeimxcatua.jpeg"
					alt=""
					/>
					<div className="widget__contentTitle">
						<h5>Mobile App Programmer</h5>
						<p>The best Mobile App Development Company</p>
					</div>
				</div> */}
				{/* <div className="widget__content">
					<img
					src="https://qphs.fs.quoracdn.net/main-thumb-ti-1574818-100-mzdwostcualpwcxekyrvyqqpychetdoc.jpeg"
					alt=""
					/>
					<div className="widget__contentTitle">
						<h5>Quota of Quotes</h5>
						<p>Daily dosage of unforgettable lines from ...</p>
					</div>
				</div> */}
				{/* <div className="widget__content">
					<img
					src="https://qphs.fs.quoracdn.net/main-thumb-ti-1644613-100-ydflucgoeztbhwyurtmlqqrgfqmjmhpl.jpeg"
					alt=""
					/>
					<div className="widget__contentTitle">
						<h5>Art & Artist</h5>
						<p>A Space retated to creating, practicing an...</p>
					</div>
				</div> */}
				{/* <div className="widget__content">
					<img
					src="https://qphs.fs.quoracdn.net/main-thumb-ti-1647318-100-kmwvqbpzatmylibelrowrerfqbspekwo.jpeg"
					alt=""
					/>
					<div className="widget__contentTitle">
						<h5>Friedrich Nietzche</h5>
						<p>A Space dedicated to great work of Friedrich...</p>
					</div>
				</div> */}
				{/* <div className="widget__content">
					<img
					src="https://qphs.fs.quoracdn.net/main-thumb-ti-1578647-100-xkggvbyzfkvzhyklewtkjijefekqbazb.jpeg"
					alt=""
					/>
					<div className="widget__contentTitle">
						<h5>Stock Market Strategies</h5>
						<p>Everything about investing in Stock...</p>
					</div>
				</div> */}
				{/* <div className="widget__content">
					<img
					src="https://qphs.fs.quoracdn.net/main-thumb-ti-1711686-100-glvgnbatdxpjbhrkyphlfamqrryfccvp.jpeg"
					alt=""
					/>
					<div className="widget__contentTitle">
						<h5>Architecture World</h5>
						<p>All about civil architecture...</p>
					</div>
				</div> */}
			</div>
      	</div>
    )
  }
}

export default Widget;


// import { Image, StyleSheet, View } from 'react-native';

// const image = () => (
//     <View style={styles.imgContainer}>
//         <Image style={styles.image} source={require('assets/images/image.png')} />
//     </View>
// );

// const style = StyleSheet.create({
//     imgContainer: {
//         flexDirection: 'row'
//     },
//     image: {
//         resizeMode: 'contain',
//         flex: 1,
//         aspectRatio: 1 // Your aspect ratio
//     }
// });