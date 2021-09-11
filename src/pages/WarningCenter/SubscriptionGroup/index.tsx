import React, { useState, useEffect } from 'react'
import {Table, message, Button, Modal, Form, Input,Select,Popconfirm} from 'antd'
import { fetchSubGroupListSev, fetchAddSubGroupSev, fetchUpdateSubGroupSev, fetchDeleteSubGroupSev } from '@/services/warningSev'
import { ISubListItem } from './interface'
import './index.less'

const SubscriptionGroup: React.FC = () => {
  const { TextArea } = Input;
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 })
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [subList, setSymbolList] = useState<Array<ISubListItem>>([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('新增');
  const [typeValue, setTypeChange] = useState('default');
  const [folderForm] = Form.useForm();

  useEffect(() => {
    fetchSubList()
  }, [pagination])

  // 获取数据
  const fetchSubList = () => {
    const { current, pageSize } = pagination
    setLoading(true)
    fetchSubGroupListSev({
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

  //列表columns 
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '订阅组名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 180,
    },
    {
      title: '推送方式',
      dataIndex: 'type',
      width: 180,
    },
    {
      title: '默认接收方',
      dataIndex: 'default_target',
      render (text: any) {
        return (text||[]).toString()
      }
    },
    {
      title: '自定义接收方',
      dataIndex: 'custom_target',
      render (text: any) {
        return (text||[]).toString()
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (text: any, record) => (
        <span>
          <Button type="link" onClick={() => handleModalShow(record,'编辑')}>编辑</Button>
          
          <Popconfirm
            title="是否确认删除？"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </span>
      ),
    },
  ]

  // 分页
  const handleTableChange = (pagination: any) => {
    const cloneObj = Object.assign({}, pagination)
    delete cloneObj.count
    setPagination(cloneObj)
  }

  // 删除
  const handleDelete = (id: number) => {
    fetchDeleteSubGroupSev(id).then((res: any)=>{
      if(res.code !== 0) return
      message.success('删除成功');
      fetchSubList()
    })
  }

  // 新增/编辑 弹窗
  const handleModalShow = (record,title) => {
    setIsModalVisible(true);
    setModalType(title)
    setTypeChange(record.type)
    folderForm.setFieldsValue(record)
  }

  const listFormat = (params) => {
    if(params){
        return params.split(',')
    }
    return []
  }

  // 新增/编辑 提交表单
  const hanldeAddSubmit = () => {
    folderForm.validateFields().then((values) => {
      if(values?.default_target){
        values.default_target = listFormat(values.default_target)
      }
      if(values?.custom_target){
        values.custom_target = listFormat(values.custom_target)
      }
      if(modalType === '新增'){
        fetchAddSubGroupSev(values).then( res => {
          hanleFinally(res)
        })
      }
      if(modalType === '编辑'){
        const id =  folderForm.getFieldValue('id')
        fetchUpdateSubGroupSev(values,id).then( res => {
          hanleFinally(res)
        })
      }
    }).catch((info) => {});
  }

  // 请求成功后的执行
  const hanleFinally = (res: any) => {
    if(res.code !== 0) return
    folderForm.resetFields();
    setIsModalVisible(false);
    fetchSubList()
  }

  return (
    <div className='layout-page'>
      <div className="p20 tar">
        <Button type="primary" onClick={()=> handleModalShow({type:'default'},'新增')}>新增</Button>
      </div>
      <Modal
        getContainer={false}
        visible={isModalVisible}
        title={`${modalType}订阅组`}
        onCancel={()=>{setIsModalVisible(false); folderForm.resetFields();}}
        onOk={hanldeAddSubmit}>
        <Form form={folderForm} labelCol={{span: 6}} wrapperCol={{span: 16}} initialValues={{type:typeValue}} >
          <Form.Item
            label="订阅组名称"
            name="name"
            rules={[{ required: true, message: '请输入订阅组名称'}]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="推送方式"
            name="type">
            <Select value={typeValue} onChange={(value:string)=>setTypeChange(value)}>
              <Select.Option value="default">default</Select.Option>
              <Select.Option value="custom">custom</Select.Option>
            </Select>
          </Form.Item>
          {typeValue === 'default' ? (<Form.Item
            label="默认接收方"
            name="default_target"
            rules={[{ required: true, message: '请输入默认接收方'}]}>
            <Input />
          </Form.Item>) : (<Form.Item
            label="自定义接收方"
            name="custom_target"
            rules={[{ required: true, message: '请输入自定义接收方'}]}>
            <TextArea rows={4}/>
          </Form.Item>)}
        </Form>
      </Modal>
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

export default SubscriptionGroup
