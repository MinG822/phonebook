import React, { Component } from 'react'
import PhoneInfo from './PhoneInfo'

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    // 함수가 전달 되지 않았을 경우를 대비한 default Props
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined')
  }
  // 검색될 때 마다 가상 DOM에 렌더링 되는 것을 방지하기 위해서
  // 바로 이 지점 때문에 불변성을 지켜주는 것이 중요하다.
  // 이전 배열과 현재의 배열이 다른 것을 바로 인지해 최적화 시켜주기 위해서
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data
  }

  render() {
    console.log('render PhoneInfoList')
    const { data, onRemove, onUpdate } = this.props
    // return 내부에서 for문을 돌려 자식 컴포넌트 작성하는게 아니라 바깥에서 map을 통해 jsx로 변환
    // key 값은 배열을 렌더링 할 때 꼭 필요한 값, 배열을 렌더링 할 때 키의 값을 통해 업데이트 성능을 최적화함
    const list = data.map(
      info => (
        <PhoneInfo 
          key={info.id} 
          info={info}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />)
    )
    // key 값으로 쓸만한 고유값이 없을 때. 성능은 똑같이 비효율적
    // const list = data.map(
    //   (info, index) => (<PhoneInfo key={index} info={info}/>)
    // )

    return (
      <div>
        {list}
      </div>
    )
  }
}

export default PhoneInfoList