import Menu from "../models/menu.js";


export const addMenu = async (req, res) => {
  const { id } = req.params; 
  const { menuItems } = req.body; 

  try {
    
    // CHECK THE EXISTANCE OF THE ITEM
    let menu = await Menu.findOne({ restaurantId: id });

    if (menu) {
      
    // IF IT EXISTS, APPEND NEW DATA
      menu.menuItems.push(...menuItems);
    } else {
      
    // ADD NEW OTHERWISE
      menu = new Menu({
        restaurantId: id,
        menuItems,
      });
    }

  
    // SAVE 
    await menu.save();
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};