import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  Animated 
} from 'react-native';
import { 
  Trash2Icon, 
  ShareIcon, 
  EditIcon 
} from 'lucide-react-native';

const LongPressItemMenu = ({menuPosition, setIsMenuVisible, isMenuVisible, fadeAnim}) => {

  const handleMenuAction = (action) => {
    // Close menu first
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      // Then hide modal
      setIsMenuVisible(false);
    });

    // Handle specific actions
    switch(action) {
      case 'delete':
        console.log('Delete item');
        break;
      case 'share':
        console.log('Share item');
        break;
      case 'edit':
        console.log('Edit item');
        break;
    }
  };

  return (
    <View style={styles.container}>

      <Modal
        transparent={true}
        visible={isMenuVisible}
        animationType="none"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <View 
          style={[
            styles.modalOverlay, 
            { 
              position: 'absolute', 
              left: menuPosition.x, 
              top: menuPosition.y 
            }
          ]}
        >
          <Animated.View 
            style={[
              styles.popupMenu, 
              { 
                opacity: fadeAnim,
                transform: [
                  { 
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1]
                    }) 
                  }
                ]
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuAction('delete')}
            >
              <Trash2Icon color="#FF6B6B" size={20} />
              <Text style={styles.menuItemText}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuAction('share')}
            >
              <ShareIcon color="#4ECDC4" size={20} />
              <Text style={styles.menuItemText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuAction('edit')}
            >
              <EditIcon color="#45B7D1" size={20} />
              <Text style={styles.menuItemText}>Edit</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  itemButton: {
    backgroundColor: '#6A5ACD',
    padding: 15,
    borderRadius: 10,
    elevation: 3
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  modalOverlay: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // right: 10,
    // bottom: 10,
  },
  popupMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 200
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  menuItemText: {
    marginLeft: 10,
    color: '#333',
    fontSize: 16
  }
});

export default LongPressItemMenu;