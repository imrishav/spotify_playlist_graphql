import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card } from '@uprise/card';
import { Button } from '@uprise/button';
import { text } from '@uprise/typography';
import styled from 'styled-components';

const USER_QUERY = gql`
  query UserQuery {
    queryUser(name: "chilledCow") {
      id
      display_name
      followers
      image
    }
  }
`;

const OverviewWrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  height: 40vh;
  border-radius: 19px;

  .flexcontrol {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 20px;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .content__followers__text {
    font-size: 15px;
    display: inline-block;
    margin-top: 28px;
    font-weight: lighter;
  }

  .btnStyle {
    position: relative;
    bottom: -109px;
    top: 111px;
  }

  .imageStyle {
    width: 360px;
    height: 284px;
    border-radius: 29px;
  }
`;

const User = () => {
  const { loading, error, data } = useQuery(USER_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Fetching, Please Refresh </p>;

  const { display_name, followers, image } = data.queryUser;

  return (
    <OverviewWrapper>
      <div className="flexcontrol">
        <Card>
          <img className="imageStyle" src={image} />
        </Card>
        <div>
          <div className="content">
            <text style={{ fontSize: '30px' }}>{display_name}</text>
            <text className="content__followers__text">
              Followers ({followers})
            </text>
          </div>
          <Button className="btnStyle" title="Follow" fullWidth />
        </div>
      </div>
    </OverviewWrapper>
  );
};

export default User;
