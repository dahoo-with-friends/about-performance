import React, { useState, useEffect } from 'react'
import {Table, Space, message, Popconfirm, Button} from 'antd'
import { fetchMySubListSev, fetchCancelSubSev } from '@/services/warningSev'
import './index.less'
import { ISubListItem } from './interface'
import AdvancedSearchForm from './search'

const MySubscription: React.FC = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 })
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [subList, setSymbolList] = useState<Array<ISubListItem>>([])

  useEffect(() => {
    fetchSubList()
  }, [pagination])

  // 获取数据
  const fetchSubList = () => {
    const { current, pageSize } = pagination
    setLoading(true)
    fetchMySubListSev({
      pageIndex: current,
      pageSize,
    }).then((res) => {
      setLoading(false)
      const result = res?.data?.results
      const totalNum = res?.data?.count
      setSymbolList(result)
      setTotal(totalNum)
    })
    .catch(() => {
      setLoading(false)
    })
  }

  // 分页
  const handleTableChange = (pagination: any) => {
    const cloneObj = Object.assign({}, pagination)
    delete cloneObj.total
    setPagination(cloneObj)
  }

  // 取消订阅
  const handleCancelSub = (id: number) => {
    fetchCancelSubSev(id).then((res: any) => {
      if(res.code !== 0) return
      message.success('订阅取消成功')
      fetchSubList()
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '订阅类型',
      dataIndex: 'type',
    },
    {
      title: '订阅方',
      dataIndex: 'person',
      render(text, record){
        return record.person ? record.person : record.target_name
      }
    },
    {
      title: '所属租户',
      dataIndex: 'tenant_name',
    },
    {
      title: '规则名称',
      dataIndex: 'rule_name',
    },
    {
      title: '预警等级',
      dataIndex: 'alert_rule_level',
    },
    {
      title: '配置路径',
      dataIndex: 'folder_name',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: { id: number; }) => (
        <Space size='middle'>
           <Popconfirm
            title="是否确认取消订阅？"
            onConfirm={() => handleCancelSub(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">取消订阅</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className='layout-page'>
      <div className='p20 bfff mb24'>
        <AdvancedSearchForm/>
      </div>
      <Table
        className="p20 bfff"
        loading={loading}
        rowKey='id'
        columns={columns}
        dataSource={subList}
        pagination={{ ...pagination, total }}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default MySubscription
