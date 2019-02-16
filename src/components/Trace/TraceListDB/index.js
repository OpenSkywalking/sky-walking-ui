/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { PureComponent } from 'react';
import {List, Button } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import styles from './index.less';

class TraceList extends PureComponent {
  renderEndpointName = (opName, duration, maxDuration) => {
    return (
      <div className={styles.progressWrap}>
        <div
          className={styles.progress}
          style={{
            backgroundColor: '#87CEFA',
            width: `${(duration * 100) / maxDuration}%`,
            height: 25,
          }}
        />
        <div className={styles.mainInfo}>
          <Ellipsis length={100} tooltip style={{ width: 'initial' }}>
            {opName}
          </Ellipsis>
          <span className={styles.duration}>{`${duration}ms`}</span>
        </div>
      </div>
    );
  };

  renderDescription = (start, traceIds) => {
    const { onClickTraceTag } = this.props;
    return (
      <div>
        <Button size="small" onClick={() => onClickTraceTag(traceIds)}>
          {traceIds}
        </Button>
      </div>
    );
  };

  render() {
    const { data: traces, loading } = this.props;
    let maxDuration = 0;
    traces.forEach(item => {
      if (item.latency > maxDuration) {
        maxDuration = item.latency;
      }
    });
    return (
      <List
        className={styles.traceList}
        itemLayout="horizontal"
        size="small"
        dataSource={traces}
        loading={loading}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={this.renderEndpointName(
                item.statement,
                item.latency,
                maxDuration
              )}
              description={this.renderDescription(item.start, item.traceId)}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default TraceList;
