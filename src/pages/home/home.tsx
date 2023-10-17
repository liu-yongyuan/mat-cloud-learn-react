import React from 'react';
import { Button, Calendar, Card, Col, DatePicker, Divider, Flex, Pagination, Row, Typography } from 'antd';
const cardStyle: React.CSSProperties = {
  width: 620,
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 273,
};

const CardBox: React.FC<{ children: React.ReactNode; height: number }> = (props) => (
  <Card hoverable style={{ ...cardStyle, height: props.height }} bodyStyle={{ padding: 0, overflow: 'hidden' }}>
    {props.children}
  </Card>
);

const Home: React.FC = () => {
  return (
    <>
      <Row>
        <Col span={8}>
          <CardBox height={330}>
            <Calendar fullscreen={false} />
          </CardBox>
        </Col>
        <Col span={8}>
          <Card hoverable style={cardStyle} bodyStyle={{ padding: 0, overflow: 'hidden' }}>
            <Flex justify="space-between">
              <img
                alt="avatar"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                style={imgStyle}
              />
              <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                <Typography.Title level={3}>
                  “antd is an enterprise-class UI design language and React UI library.”
                </Typography.Title>
                <Button type="primary">Get Start</Button>
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col span={8}>
          <DatePicker showTime />
        </Col>
      </Row>
      <Divider orientation="left"> </Divider>
      <Row>
        <Col span={24}>
          <Pagination total={500} />
        </Col>
      </Row>
    </>
  );
};

export default Home;
