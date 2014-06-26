Change = new Meteor.Collection("change");
Blocks = new Meteor.Collection("blocks");
Loops = new Meteor.Collection("loops");
Fxns = new Meteor.Collection("fxns");
Program = new Meteor.Collection("program");

Meteor.startup(function () {
});

Meteor.publish('max_clnum', function() {
  // extract 'clnum' from this to get the max clnum
  return Change.find({}, {sort: {clnum: -1}, limit: 1});
});

Meteor.publish('dat_clnum', function(clnum){
  // can only return as many as in the changelist
  return Change.find({clnum: clnum}, {sort: {address: 1}, limit:20});
});


Meteor.publish('dat_iaddr', function(iaddr){
  // fetch the static info about the range
  return Change.find({address: iaddr, type: "I"}, {sort: {clnum: 1}, limit:10})
});

Meteor.publish('dat_daddr', function(daddr){
  // fetch the dynamic info about the instruction range
  //return Change.find({address : {$gt: daddr-0x100, $lt: daddr+0x300}});
  if (daddr >= 0x1000) {
    return Change.find({address:daddr}, {sort: {clnum: 1}, limit:10});
  } else {
    return false;
  }
});
