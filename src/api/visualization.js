import request from '@/utils/request.js'

export const getVisualizations = () => {
    return request(
        {
            url: '/visualization',
        }
    )
}