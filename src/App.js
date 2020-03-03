import React, { Component } from 'react';
import './App.css';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2
  // App 의 state에 배열인 information 설정
  state = {
    information: [
      {
        id: 0,
        name: '김먼지',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '김민자',
        phone: '010-0000-0001'
      }
    ],
    keyword: ''
  }
  handleCreate = (data) => {
    const { information } = this.state
    this.setState({
      information: information.concat({id: this.id++, ...data})
    })
  }
  handleRemove = (id) => {
    const { information } = this.state
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }
  handleUpdate = (id, data) => {
    const {information} = this.state
    this.setState({
      information: information.map(
        info => id === info.id
        // 수정하려는 info라면 새 객체를 만들어서 기존의 값을 전달 받은 data로 덮어씀
          ? { ...info, ...data }
          : info
      )
    })
  }
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }
  render() {
    console.log('app rendered')
    // state의 information를 선언, 밑에서 this.state.information 으로 조회할 필요가 없다.
    const { information, keyword } = this.state
    const filteredList = information.filter(
      // 검색 가능할 때
      // 검색어가 없을 때는 keyword는 ''이기 때문에 항상 keyword의 index는 0이어서 전체 검색이 된다.
      info => info.name.indexOf(keyword) !== -1
    )
    return (
      <div>
      {/* 자식 컴포넌트에게 props로 함수 onCreate를 보내고, 자식컴포넌트에게 받은 data를 handleCreate를 통해 처리. */}
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        <p>
          <input
            placeholder="검색 할 이름을 입력하세요"
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <PhoneInfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
         />
      </div>
    );
  }
}

export default App;
