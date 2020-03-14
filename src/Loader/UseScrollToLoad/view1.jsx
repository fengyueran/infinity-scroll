import React, { Component } from "react";
import styled from "styled-components";
import data from "../../data";

class Item extends Component {
  componentDidMount() {
    /* eslint-disable-next-line */
    this.props.cachePosition(this.node, this.props.index);
  }

  render() {
    /* eslint-disable-next-line */
    const { index, item } = this.props;

    return (
      <div
        style={{ height: "60px", border: "1px solid" }}
        ref={node => {
          this.node = node;
        }}
      >
        {index}
      </div>
    );
  }
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: overlay;
`;

const Card = styled.div`
  width: 250px;
  height: 200px;
  border: 1px solid;
  background: antiquewhite;
`;

const height = 60;
const bufferSize = 5;

class VirtualizedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startOffset: 0,
      endOffset: 0,
      visibleData: []
    };

    this.startIndex = 0;
    this.endIndex = 0;
    this.scrollTop = 0;

    // 缓存已渲染元素的位置信息
    this.cache = [];
    // 缓存锚点元素的位置信息
    this.anchorItem = {
      index: 0, // 锚点元素的索引值
      top: 0, // 锚点元素的顶部距离第一个元素的顶部的偏移量(即 startOffset)
      bottom: 0 // 锚点元素的底部距离第一个元素的顶部的偏移量
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.cachePosition = this.cachePosition.bind(this);
  }

  cachePosition(node, index) {
    const rect = node.getBoundingClientRect();
    const top = rect.top + window.pageYOffset;
    console.log("index", index);
    console.log("bottom", top + height);
    this.cache.push({
      index,
      top,
      bottom: top + height
    });
    console.log(" this.cache", this.cache);
  }

  // 滚动事件处理函数
  handleScroll(e) {
    const scrollTop = this.wrapper.scrollTop;
    if (scrollTop > this.scrollTop) {
      console.log("111111", scrollTop);
      if (scrollTop > this.anchorItem.bottom) {
        this.updateBoundaryIndex(scrollTop);
        this.updateVisibleData();
      }
    } else if (scrollTop < this.scrollTop) {
      console.log("2222");
      if (scrollTop < this.anchorItem.top) {
        this.updateBoundaryIndex(scrollTop);
        this.updateVisibleData();
      }
    }

    this.scrollTop = scrollTop;
  }

  // 计算 startIndex 和 endIndex
  updateBoundaryIndex(scrollTop) {
    scrollTop = scrollTop || 0;
    // 用户正常滚动下，根据 scrollTop 找到新的锚点元素位置
    const anchorItem = this.cache.find(item => item.bottom >= scrollTop);
    console.log("anchorItem", anchorItem);
    if (!anchorItem) {
      // 滚的太快，找不到锚点元素，这个暂不处理
      return;
    }

    this.anchorItem = {
      ...anchorItem
    };

    this.startIndex = this.anchorItem.index;
    this.endIndex = this.startIndex + this.visibleCount;
    console.log("startIndex", this.startIndex);
    console.log("endIndex", this.endIndex);
  }

  updateVisibleData() {
    const visibleData = data.slice(this.startIndex, this.endIndex);

    this.setState({
      startOffset: this.anchorItem.top,
      endOffset: (data.length - this.endIndex) * height,
      visibleData
    });
  }

  componentDidMount() {
    // 计算可渲染的元素个数
    this.visibleCount = Math.ceil(window.innerHeight / height) + bufferSize;
    this.endIndex = this.startIndex + this.visibleCount;
    this.updateVisibleData();

    this.wrapper.addEventListener("scroll", this.handleScroll, false);
  }

  render() {
    const { startOffset, endOffset, visibleData } = this.state;

    return (
      <Container
        ref={node => {
          this.wrapper = node;
        }}
      >
        <div
          style={{
            paddingTop: `${startOffset}px`,
            paddingBottom: `${endOffset}px`
          }}
        >
          {visibleData.map((item, index) => {
            return (
              <Item
                cachePosition={this.cachePosition}
                key={this.startIndex + index}
                index={this.startIndex + index}
              >
                {item.id}
              </Item>
            );
          })}
        </div>
      </Container>
    );
  }
}

export default VirtualizedList;
