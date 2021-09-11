import service from '@/utils/request'

const fetchM = (data) => {
  return service({
    url: '/m/',
    params: data,
    method: 'get',
  })
}
const saveM = (data) => {
  return service({
    url: '/m/',
    data,
    method: 'post',
  })
}

export {
  fetchM,
  saveM,
}
