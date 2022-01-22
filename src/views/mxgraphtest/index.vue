<template>
	<div class="main">
		<div style="padding: 20px;">仅作基础演示：</div>
		<div style="background-color: white;padding: 20px;">
			<div id="mxgraph-demo"></div>
			<div id="btnwrap"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			toinitgraph:function(){
				
				//悬浮可以出现元素操作工具的方法===
				// Defines a subclass for mxVertexHandler that adds a set of clickable
				// icons to every selected vertex.
				function mxVertexToolHandler(state)
				{
					mxVertexHandler.apply(this, arguments);
				};
				
				mxVertexToolHandler.prototype = new mxVertexHandler();
				mxVertexToolHandler.prototype.constructor = mxVertexToolHandler;
				
				mxVertexToolHandler.prototype.domNode = null;
				
				mxVertexToolHandler.prototype.init = function()
				{
					mxVertexHandler.prototype.init.apply(this, arguments);
				
					// In this example we force the use of DIVs for images in IE. This
					// handles transparency in PNG images properly in IE and fixes the
					// problem that IE routes all mouse events for a gesture via the
					// initial IMG node, which means the target vertices 
					this.domNode = document.createElement('div');
					this.domNode.style.position = 'absolute';
					this.domNode.style.whiteSpace = 'nowrap';
					
					// Workaround for event redirection via image tag in quirks and IE8
					function createImage(src)
					{
						if (mxClient.IS_IE && !mxClient.IS_SVG)
						{
							var img = document.createElement('div');
							img.style.backgroundImage = 'url(' + src + ')';
							img.style.backgroundPosition = 'center';
							img.style.backgroundRepeat = 'no-repeat';
							img.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';
							
							return img;
						}
						else
						{
							return mxUtils.createImage(src);
						}
					};
				
					// Delete
					var img = createImage('mxgraph-master/javascript/examples/images/delete2.png');
					img.setAttribute('title', 'Delete');
					img.style.cursor = 'pointer';
					img.style.width = '16px';
					img.style.height = '16px';
					mxEvent.addGestureListeners(img,
						mxUtils.bind(this, function(evt)
						{
							// Disables dragging the image
							mxEvent.consume(evt);
						})
					);
					mxEvent.addListener(img, 'click',
						mxUtils.bind(this, function(evt)
						{
							this.graph.removeCells([this.state.cell]);
							mxEvent.consume(evt);
						})
					);
					this.domNode.appendChild(img);
				
					// Size
					var img = createImage('mxgraph-master/javascript/examples/images/fit_to_size.png');
					img.setAttribute('title', 'Resize');
					img.style.cursor = 'se-resize';
					img.style.width = '16px';
					img.style.height = '16px';
					mxEvent.addGestureListeners(img,
						mxUtils.bind(this, function(evt)
						{
							this.start(mxEvent.getClientX(evt), mxEvent.getClientY(evt), 7);
							this.graph.isMouseDown = true;
							this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
							mxEvent.consume(evt);
						})
					);
					this.domNode.appendChild(img);
				
					// Move
					var img = createImage('mxgraph-master/javascript/examples/images/plus.png');
					img.setAttribute('title', 'Move');
					img.style.cursor = 'move';
					img.style.width = '16px';
					img.style.height = '16px';
					mxEvent.addGestureListeners(img,
						mxUtils.bind(this, function(evt)
						{
							this.graph.graphHandler.start(this.state.cell,
								mxEvent.getClientX(evt), mxEvent.getClientY(evt));
							this.graph.graphHandler.cellWasClicked = true;
							this.graph.isMouseDown = true;
							this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
							mxEvent.consume(evt);
						})
					);
					this.domNode.appendChild(img);
				
					// Connect
					var img = createImage('mxgraph-master/javascript/examples/images/check.png');
					img.setAttribute('title', 'Connect');
					img.style.cursor = 'pointer';
					img.style.width = '16px';
					img.style.height = '16px';
					mxEvent.addGestureListeners(img,
						mxUtils.bind(this, function(evt)
						{
							var pt = mxUtils.convertPoint(this.graph.container,
									mxEvent.getClientX(evt), mxEvent.getClientY(evt));
							this.graph.connectionHandler.start(this.state, pt.x, pt.y);
							this.graph.isMouseDown = true;
							this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
							mxEvent.consume(evt);
						})
					);
					this.domNode.appendChild(img);
					
					this.graph.container.appendChild(this.domNode);
					this.redrawTools();
				};
				
				mxVertexToolHandler.prototype.redraw = function()
				{
					mxVertexHandler.prototype.redraw.apply(this);
					this.redrawTools();
				};
				
				mxVertexToolHandler.prototype.redrawTools = function()
				{
					if (this.state != null && this.domNode != null)
					{
						var dy = (mxClient.IS_VML && document.compatMode == 'CSS1Compat') ? 20 : 4;
						this.domNode.style.left = (this.state.x + this.state.width - 56) + 'px';
						this.domNode.style.top = (this.state.y + this.state.height + dy) + 'px';
					}
				};
				
				mxVertexToolHandler.prototype.destroy = function(sender, me)
				{
					mxVertexHandler.prototype.destroy.apply(this, arguments);
				
					if (this.domNode != null)
					{
						this.domNode.parentNode.removeChild(this.domNode);
						this.domNode = null;
					}
				};
				
				//初始化工具栏===
				
				// Creates new toolbar without event processing
				var toolbar = new mxToolbar(document.getElementById('btnwrap'));
				toolbar.enabled = false
				
				var model = new mxGraphModel();
				
				//初始化界面===
				
				var container = document.getElementById('mxgraph-demo')
				var themodel = new mxGraphModel();
				var initgraph = new mxGraph(container,themodel)//不能保存初始化到vue的data
				initgraph.dropEnabled = true;
				initgraph.connectionHandler.createTarget = true;
				
				// initgraph.setConnectable(true);

				var parent = initgraph.getDefaultParent()//父级容器
				var model = initgraph.getModel()
				
				//挂载悬浮出现工具的方法
				initgraph.createHandler = function(state)
				{
					if (state != null &&
						this.model.isVertex(state.cell))
					{
						return new mxVertexToolHandler(state);
					}
				
					return mxGraph.prototype.createHandler.apply(this, arguments);
				};
				
				//监听拖拽到视图===
				// Matches DnD inside the graph
				mxDragSource.prototype.getDropTarget = function(graph, x, y)
				{
					var cell = graph.getCellAt(x, y);
					
					if (!graph.isValidDropTarget(cell))
					{
						cell = null;
					}
					
					return cell;
				};
				
				//生成按钮===
				
				function addToolbarItem(graph, toolbar, prototype, image)
				{
					// Function that is executed when the image is dropped on
					// the graph. The cell argument points to the cell under
					// the mousepointer if there is one.
					var funct = function(graph, evt, cell)
					{
						graph.stopEditing(false);
				
						var pt = graph.getPointForEvent(evt);
						var vertex = graph.getModel().cloneCell(prototype);
						vertex.geometry.x = pt.x;
						vertex.geometry.y = pt.y;
						
						graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
					}
				
					// Creates the image which is used as the drag icon (preview)
					var img = toolbar.addMode(null, image, funct);
					mxUtils.makeDraggable(img, graph, funct);
				}
				
				var addVertex = function(icon, w, h, style)
				{
					var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
					vertex.setVertex(true);
				
					addToolbarItem(initgraph, toolbar, vertex, icon);
				};
				
				addVertex('mxgraph-master/javascript/src/images/left-icon/swimlane.gif', 120, 160, 'shape=swimlane;startSize=20;');
				addVertex('mxgraph-master/javascript/src/images/left-icon/rectangle.gif', 100, 40, '');
				addVertex('mxgraph-master/javascript/src/images/left-icon/rounded.gif', 100, 40, 'shape=rounded');
				addVertex('mxgraph-master/javascript/src/images/left-icon/ellipse.gif', 40, 40, 'shape=ellipse');
				addVertex('mxgraph-master/javascript/src/images/left-icon/rhombus.gif', 40, 40, 'shape=rhombus');
				addVertex('mxgraph-master/javascript/src/images/left-icon/triangle.gif', 40, 40, 'shape=triangle');
				addVertex('mxgraph-master/javascript/src/images/left-icon/cylinder.gif', 40, 40, 'shape=cylinder');
				addVertex('mxgraph-master/javascript/src/images/left-icon/actor.gif', 30, 40, 'shape=actor');
				
				//初始化连线===
				initgraph.connectionHandler.createEdgeState = function(me)
				{
					var edge = initgraph.createEdge(null, null, null, null, null);
					return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
				};
				initgraph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';//该设置只能对顶级的下一级的连接线设置有效，并设置成横竖的连接线，不能对更多下级的连接线样式进行有效设置
				
				//元素内部不允许编辑===
				// initgraph.isCellEditable = function(cell)  
				// {   
				//  return !this.getModel().isEdge(cell)&&!this.getModel().isVertex(cell);  
				// };
				
				//直接获取方法3里面doc元素的属性值===
				var key1 = 'f'
				var key2 = 'e'
				initgraph.convertValueToString = function(cell){
					if(mxUtils.isNode(cell.value)){
						if(cell.value.nodeName == 'person'){
							if(cell.getAttribute(key2)!=null&&cell.getAttribute(key2).length > 0){
								return cell.getAttribute(key1) + ',' + cell.getAttribute(key2)
							}
							return cell.getAttribute(key1)
						}
					}
					return cell.value
				}
				
				//layout初始化跟监听===
				/* 初始化 */
				var stark = new mxStackLayout(initgraph)//parent里面还有parent的时候，这时候可以用这个对parent初始化，第二个参数false可以让parent节点垂直进行渲染
				var tree = new mxCompactTreeLayout(initgraph)//parent里面的节点横向渲染
				// var Hierarchical = new mxHierarchicalLayout(initgraph)//parent里面的节点竖向渲染
				/*用这个实时监听layout*/
				var layoutM = new mxLayoutManager(initgraph)
				layoutM.getLayout = function(cell){
					if(!model.isEdge(cell) && model.getChildCount(cell)>0 && (model.getParent(cell) == model.getRoot())){
						// return stark/* (不停parent容器的位置) */
					}
					// return tree/* (不停初始化parent里面容器的位置) */
				}
				
				//移动监听改变===
				initgraph.addListener(mxEvent.CELLS_MOVED, function(sender, evt) {
				  // console.log(111111)
				})
				
				// Stops editing on enter or escape keypress
				var keyHandler = new mxKeyHandler(initgraph);
				var rubberband = new mxRubberband(initgraph);
				
				//视图监听开始===
				model.beginUpdate()
				
				try{
					
					var subparent = initgraph.insertVertex(parent,null,'subparent',160,50,80,80,'fillColor=#ececec;strokeColor=white;')
					var subparent2 = initgraph.insertVertex(parent,null,'subparent2',260,250,80,80,'fillColor=#ececec;strokeColor=white;')
					
					//方式1追加(实际上就是方式2的拆分)
					var child1 = new mxCell('盒子1',new mxGeometry(130,20,80,30),'fillColor=skyblue;strokeColor=white;');
					child1.setVertex(true);
					child1.geometry.relative = false//设置这个，元素不能移动，false可以移动
					model.add(subparent,child1)//往父级容器里面追加元素
					//方式2追加
					var child2 = initgraph.insertVertex(subparent,null,'盒子2',260,20,80,30,'fillColor=skyblue;strokeColor=white;')
					var child2a = initgraph.insertVertex(subparent2,null,'盒子2a',260,20,80,30,'fillColor=skyblue;strokeColor=white;')
					var child3 = initgraph.insertVertex(subparent,null,'盒子3',0,20,80,30,'fillColor=skyblue;strokeColor=white;')
					//方式追加3
					var child4 = initgraph.insertVertex(subparent2,null,((function(){
						var doc = mxUtils.createXmlDocument();
						var docel = doc.createElement('person');
						docel.setAttribute(key1,'1');
						docel.setAttribute(key2,'2');
						return docel;
					})()),0,30,80,30,'fillColor=skyblue;strokeColor=white;')
					//连接方式
					var el = initgraph.insertEdge(subparent,null,'连接',child1,child2,'edgeStyle=orthogonalEdgeStyle;')
					var el2 = initgraph.insertEdge(subparent,null,'',child3,child1,'edgeStyle=orthogonalEdgeStyle;')
					var el3 = initgraph.insertEdge(subparent2,null,'',child4,child2a,'edgeStyle=orthogonalEdgeStyle;')
					
					//取消不停监听layout的方法，使用这里的
					// tree.execute(subparent2)//打开这个方法之后会影响比如subparent2集合里面元素移动的edge连接线样式，无法动态改变成竖线横线模式，目前找不到方法去纠正
					// tree.execute(subparent)
					
					var el4 = initgraph.insertEdge(parent,null,'',subparent2,subparent)

					//取消不停监听layout的方法，使用这里的
					// stark.execute(parent)
					
				}finally{
					model.endUpdate()//监听结束
				}
			}
		},
		mounted(){
			this.toinitgraph()
		}
	}
</script>

<style scoped="scoped">
	.main {
		padding: 20px 20px 0;
	}
	#btnwrap {
		display: inline-block;
	}
</style>
