// Imports
import React, {useState} from 'react';
// Images
import logoImg from '../img/logo.png';
// Dependencies
import {Form, Checkbox, Button, Modal, Image, Header} from 'semantic-ui-react';
import useUpdate from "./hooks/useUpdate";

export default function AddRest(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const [restName, setRestName] = useUpdate('');
  const [phoneNumber,setPhoneNumber] = useUpdate('');
  const [imageUrl, setImageUrl] = useUpdate('');
  const [restUrl, setRestUrl] = useUpdate('');

  const {closeInfoWindow, newRestData, restaurants, handleNewData} = props;

  function handleCancel () {
    setIsModalOpen(false);
    props.closeInfoWindow();
  }

  function handleSubmit() {
    const id = restaurants.length;
    const {address, lat, lng} = newRestData;

    const newRestaurant = {
      "id": id,
      "restaurantName": restName,
      "address": address,
      "lat": lat,
      "lng": lng,
      "streetViewURL": `https://maps.googleapis.com/maps/api/streetview?`+
        `size=500x300`+
        `&location=${lat},${lng}`+
        `&heading=151.78`+
        `&pitch=-0.76`+
        `&key=${process.env.REACT_APP_G_API}`,
      "isFromFile": true,
      "place_id": "",
      "avgRating": 0,
      "numberOfReviews": 0,
      "details": {
        "reviews": [],
        "photoUrl": imageUrl,
        "phoneNumber": phoneNumber,
        "link": restUrl,
      }
    };

    handleNewData(newRestaurant, 'restaurant');
    handleCancel();
  }

  return(
    <div>
      <Button.Group>
        <Button
          onClick={setIsModalOpen}
          positive
          value={true}
          name='modalOpen'
        > Add </Button>
        <Button.Or />
        <Button onClick={closeInfoWindow}>Cancel</Button>
      </Button.Group>

      <Modal
        open={isModalOpen}
        onClose={handleCancel}
      >
        <Modal.Content image>
          <Image wrapped size='medium' src={logoImg} />

          <Modal.Description>
            <Header>Add New Restaurant Details</Header>
            <Form>
              <Form.Field required>
                <label>Restaurant Name</label>
                <Form.Input
                  placeholder="e.g. Pizza Express (min. 4 characters)"
                  name='restName'
                  value={restName}
                  onChange={setRestName}
                />
              </Form.Field>
              <Form.Field>
                <label>Image URL</label>
                <Form.Input
                  placeholder='e.g. http://mcdonalds.com/main-photo.jpg'
                  name='imageUrl'
                  value={imageUrl}
                  onChange={setImageUrl}
                />
              </Form.Field>
              <Form.Field>
                <label>Phone Number</label>
                <Form.Input
                  placeholder='e.g. 07456066789'
                  name='phoneNumber'
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
              </Form.Field>
              <Form.Field>
                <label>Restaurant Website</label>
                <Form.Input
                  placeholder='e.g. http://www.restaurant-name.com'
                  name='restUrl'
                  value={restUrl}
                  onChange={setRestUrl}
                />
              </Form.Field>

              <Form.Field required>
                <Checkbox
                  checked={isTermsChecked}
                  name='isTermsChecked'
                  onClick={setIsTermsChecked}
                  value={!isTermsChecked}
                  label='I agree to the Terms and Conditions' required/>
              </Form.Field>
              <Button.Group>
                <Button
                  disabled={restName.length <= 3 || !isTermsChecked}
                  onClick={handleSubmit} positive
                >
                  Submit
                </Button>
                <Button.Or />
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
              </Button.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  )
}