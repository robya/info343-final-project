import React, { Component } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';

const likeAnimation = {
    'from': {transform: 'rotate(10deg)', opacity: 1, left: '0px', top: '0px' },
    'to': { transform: 'rotate(65deg)', opacity: 0, left: '200px', top: '150px' }
  };
  
const nopeAnimation = {
    'from': {transform: 'rotate(-10deg)', opacity: 1, right: '0px', top: '0px' },
    'to': {transform: 'rotate(-65deg)', opacity: 0, right: '200px', top: '150px' },
  };

  // Button URLS from https://codepen.io/arjentienkamp/
const styles = StyleSheet.create({
    btnLike: {
        fontSize: 24,
        color: 'white',
        backgroundColor: '#FFF',
        borderRadius: '100%',
        background: 'url(http://web.arjentienkamp.com/codepen/tinder/heart.png)',
        backgroundSize: '30px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        border: '5px solid #f0f0f0',
        borderRadius: 50,
        width: 50,
        height: 50,
        display: 'inline-block',
        boxShadow: '1px 1px 1px 0px #e9e9e9',
        outline: 1,
        margin: 'auto',
        display: 'block'
    },
    btnNope: {
        background: 'url(http://web.arjentienkamp.com/codepen/tinder/delete.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '25px',
        backgroundPosition: 'center',
    },
    btnOwner: {
        background: 'url(http://web.arjentienkamp.com/codepen/tinder/info.png)',
        width: 56,
        height: 56,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '30px',
        backgroundPosition: 'center',
    },
    cardNope: {
        animationName: nopeAnimation,
        animationDuration: '1s',
    },
    cardLike: {
        animationName: likeAnimation,
        animationDuration: '1s',
    },
    carousel: {
        display: 'block',
        margin: 'auto',
        border: '1px solid #a6a9aa',
        borderRadius: '8px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
}
)

export default class Card extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        //TO-DO:
        // Grab current dog object (or current profile) from firebase
        // If empty (no object), display "No More Users in Area" message
        // Create carousal pictures
        let dogObj = this.props.dog;

        let carouselItems = dogObj.images.map(function (img) {
            let obj = { src: '../' + img, altText: dogObj.name, caption: '' };
            return obj;
        })

        let cardAnimation = css(
            this.props.liked && styles.cardLike,
            this.props.disliked && styles.cardNope
        );
        return (
            <div className='d-flex justify-content-center'>
                <div className={"card " + cardAnimation}>
                    <div className="card-body">
                            <UncontrolledCarousel className={css(styles.carousel)}
                                items={carouselItems}
                                indicators={false}
                                controls={true} />

                        <h3 className="card-title">{dogObj.name}</h3>
                        <p className="card-text">{dogObj.sex + ' ' + dogObj.breed}</p>
                        <p className='card-text'>{dogObj.bio}</p>
                        <div className='row'>
                            <div className='col justify-content-center'>
                                <button className={css(styles.btnLike, styles.btnNope)} onClick={(event) => this.props.onNopeCallback(event)}></button>
                            </div>
                            <div className='col justify-content-center'>
                                <button className={css(styles.btnLike, styles.btnOwner)}></button>
                                </div>
                            <div className='col justify-content-center'>
                                <button className={css(styles.btnLike)} onClick={(event) => this.props.onLikeCallback(event)}></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}