import React, { Component } from 'react'

class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  // handleChange = (e) => {
  //   this.setState({
  //     name: e.target.value
  //   })
  // }
  handleChange = (e) => {
    // [] 는 Computed property names
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    // 페이지 리로딩 방지, 원래 submit이 발생하면 페이지를 다시 불러 오게 되는데
    // 그렇게 되면 지니고 있던 상태를 잃어버리게 되어서 이를 통해 방지
    e.preventDefault()
    // 상태값을 onCreate 를 통해 부모에게 전달
    this.props.onCreate(this.state)
    // 상태 초기화
    this.setState({
      name: '',
      phone: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* 여러 input 을 처리해 주기 위해서 이벤트 핸들러 함수를 추가하기보다
        input 의 name 속성을 추가하면 input 을 구별할 수 있고
        name 값은 event.target.name 을 통해서 조회할 수 있다. */}
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <button type="submit">등록</button>
      </form>
    )
  }
}

export default PhoneForm