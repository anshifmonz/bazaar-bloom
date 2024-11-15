import getOrderItemDetails from '../../service/externalService.js';

const getOrderItemDetailController = async (req, res) => {
  const { userId } = req.body;
  
  try {
    const resp = await getOrderItemDetails(userId);
    res.status(200).send(resp);
  } catch (err) {    
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default getOrderItemDetailController;
