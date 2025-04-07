import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // LOADING CONTAINER STYLES
  loadingContainer: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // EXISTING STYLES REMAIN THE SAME AS IN PREVIOUS VERSION
  container: 
  {
    flex: 1,
  },

  header: 
  {
    paddingVertical: 15,
    alignItems: 'center',
  },

  headerTitle: 
  {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  emptyMenuContainer: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  emptyMenuText: 
  {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },

  emptyMenuSubtext: 
  {
    fontSize: 14,
    color: '#999',
  },

  menuList: 
  {
    padding: 10,
  },

  menuCard: 
  {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 7,
    overflow: 'hidden',
    elevation: 2,
  },

  menuImage: 
  {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
  },

  menuDetails: 
  {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },

  menuName: 
  {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing : 1
  },

  menuPrice: 
  {
    fontSize: 14,
    color: '#666',
    letterSpacing : 1
  },

  actionButtons: 
  {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },

  actionButton: 
  {
    paddingHorizontal: 5,
    paddingVertical: 6,
    marginRight: 10,
    borderRadius: 5,
    width: 'auto'
  },

  actionText: 
  {
   textAlign: 'center',
   letterSpacing: 1,
   fontWeight: 600,
   fontSize: 12
  },

  addButtonWrapper: 
  {
    padding: 10,
  },

  addButton: 
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 7,
  },

  addButtonText: 
  {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },

  modalOverlay: 
  {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContainer: 
  {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },

  modalTitle: 
  {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },

  input: 
  {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  modalButtonContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  modalButton: 
  {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  cancelButton: 
  {
    backgroundColor: '#9b59b6',
    alignItems: 'center',
    justifyContent: 'center'
  },

  modalButtonText: 
  {
    color: '#ddd',
    textAlign: 'center',
    letterSpacing: 1
  },

  imagePickerButton: 
  {
    backgroundColor: '#d3ddda',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },

  pickedImage: 
  {
    width: 100,
    height: 100,
    borderRadius: 5,
  },

  imagePickerText: 
  {
    color: '#666',
  },

  infoButton:
  {
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: 'rgba(255, 255, 255, .7)',
    borderRadius: 35
  },

  infoParentOverall:
  {
    width: '100%',
    height: '100%',
  }
});

export default styles;