import React from 'react';

const ServiceList = ({ services }) => {
  return (
    <div>
      <h2 style={{ marginBottom: '10px', marginLeft: '10px'}}>Services</h2>
      {services.map((service) => (
        <div key={service.serviceName}>
          <p style={{ marginLeft: '10px'}} >{service.serviceName}</p>
          <p style={{ marginLeft: '10px'}} >{service.serviceDescription}</p>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
