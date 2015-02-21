import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    war: { serialize: 'ids', deserialize: 'records' },
    clans: { serialize: 'ids', deserialize: 'records' }
  }
});
