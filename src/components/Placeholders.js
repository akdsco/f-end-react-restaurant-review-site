// Import Components
import React from 'react'
import { Placeholder, Grid, GridColumn } from 'semantic-ui-react'

const LeftColumnPlaceholder = () =>
  <Placeholder>
    <Placeholder.Paragraph><Placeholder.Line length='long'/></Placeholder.Paragraph>
    <Placeholder.Paragraph><Placeholder.Line length='long'/></Placeholder.Paragraph>
    <Placeholder.Paragraph>
      <Placeholder.Line length='medium'/>
      <Placeholder.Line length='very long'/>
      <Placeholder.Line length='very long'/>
      <Placeholder.Line length='very long'/>
      <Placeholder.Line length='very long'/>
      <Placeholder.Line length='very long'/>
      <Placeholder.Line length='very long'/>
      <Placeholder.Line length='very long'/>
    </Placeholder.Paragraph>
  </Placeholder>;

const RightColumnPlaceholder = () =>
  <Placeholder>
    <Placeholder.Image rectangular />
  </Placeholder>;

const ReviewsPlaceholder = (props) => {
  let reviews = [];
  let amount = 1;

  if(typeof props.amount !== 'undefined' && props.amount > amount) {
    amount = props.amount;
  }

  for (let i = 0; i < amount; i++) {
    reviews.push(<Grid centered>
      <GridColumn width={4}>
        <Placeholder>
          <Placeholder.Image/>
        </Placeholder>
      </GridColumn>
      <GridColumn width={12}>
        <Placeholder>
          <Placeholder.Paragraph><Placeholder.Line/></Placeholder.Paragraph>
          <Placeholder.Line/>
          <Placeholder.Line/>
          <Placeholder.Line/>
        </Placeholder>
      </GridColumn>
    </Grid>)
  }
  return reviews;
};

export {LeftColumnPlaceholder, RightColumnPlaceholder, ReviewsPlaceholder};