import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

import update from 'react-addons-update'

export default class Contact extends React.Component {
  // react-hot-loader 를 사용하게 되었을 때,
  // 컴포넌트가 수정되어 state 를 유지하면서 reload 되지만,
  // 이때, constructor 를 재실행하지 않으므로 직접 F5로 새로고침 할 것.
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
      keyword: '',
      contactData: [
        {
          name: 'Abet',
          phone: '010-0000-0001'
        },
        {
          name: 'Betty',
          phone: '010-0000-0002'
        },
        {
          name: 'Charlie',
          phone: '010-0000-0003'
        },
        {
          name: 'David',
          phone: '010-0000-0004'
        }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount() {
    const contactData = localStorage.contactData;

    if(contactData) {
      this.setState({
        contactData: JSON.parse(contactData)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
      localStorage.contactData = JSON.stringify(this.state.contactData);
    }
  }

  // e 자리에 위치하는 인자는 이벤트 객체를 의미한다.
  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  // 인자로 key 값을 받는다.
  handleClick(key) {
    this.setState({
      selectedKey: key
    });

    console.log(key, 'is selected');
  }

  handleCreate(contact) {
    this.setState({
      contactData: update(this.state.contactData, { $push: [contact] })
    });
  }

  handleRemove() {
    if(this.state.selectedKey < 0) {
      return;
    }

    this.setState({
      contactData: update(this.state.contactData,
        { $splice: [[this.state.selectedKey, 1]] }
      ),
      selectedKey: -1
    });
  }

  // name 과 phone 을 수정할 수 있도록 할 것이기 때문에 둘을 인자로 받는다.
  handleEdit(name, phone) {
    this.setState({
      contactData: update(this.state.contactData,
        {
          [this.state.selectedKey]: {
            name: { $set: name },
            phone: { $set: phone }
          }
        }
      )
    });
  }

  render() {
    const mapToComponents = (data) => {
      data.sort();
      data = data.filter(
        (contact) => {
          return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
        }
      );

      return data.map((contact, i) => {
        return (
          <ContactInfo
            contact={contact}
            key={i}
            // component 에서 onClick 은 적용되지 않는다.
            // Div 같은 Native DOM 에만 적용된다.
            // 따라서, ContactInfo 상의 div 에 props 에 저장된 onClick 을 지정한다.
            // 인자를 받기 위해 Arrow Function 의 형태로 인자를 전달한다.
            onClick={() => this.handleClick(i)}
          />
        );
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        <input
          name="keyword"
          placeholder="search"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <div>{mapToComponents(this.state.contactData)}</div>
        <ContactDetails
          isSelected={this.state.selectedKey != -1}
          contact={this.state.contactData[this.state.selectedKey]}
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
        />
        <ContactCreate
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
