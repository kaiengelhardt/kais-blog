+++
title = 'Hello Hugo'
date = '2025-09-18T22:29:37+02:00'
draft = false
tags = []
categories = []
+++

This is my first blog post. Amazing!

> This is a note.
{.note}

```swift
// Created by Kai Engelhardt on 22.07.25.

import Consti
import ICMusicPlayerUI
import ICServices
import UIKit

protocol WidgetViewControllerDelegate: AnyObject {
	func widgetViewControllerDidRequestMusicControls(_ sender: WidgetViewController)
}

class WidgetViewController: UIViewController {
	weak var delegate: WidgetViewControllerDelegate?

	private(set) lazy var musicWidget = MiniMusicWidget()

	private let bikeComputerService: BikeComputerService

	init(
		bikeComputerService: BikeComputerService
	) {
		self.bikeComputerService = bikeComputerService
		super.init(nibName: nil, bundle: nil)
	}

	required init?(coder: NSCoder) {
		preconditionFailure("init(coder:) has not been implemented")
	}

	override func viewDidLoad() {
		super.viewDidLoad()

		var constraints: [NSLayoutConstraint] = []
		defer {
			NSLayoutConstraint.activate(constraints)
		}

		viewRespectsSystemMinimumLayoutMargins = false
		view.insetsLayoutMarginsFromSafeArea = false
		view.directionalLayoutMargins = NSDirectionalEdgeInsets(top: 12, leading: 12, bottom: 12, trailing: 12)

		let stackView = UIStackView()
		view.addSubview(stackView)
		constraints += stackView.constraintsMatchingEdges(of: view.layoutMarginsGuide)
		stackView.translatesAutoresizingMaskIntoConstraints = false

		stackView.axis = .horizontal
		stackView.spacing = 12

		stackView.addArrangedSubview(musicWidget)

		let miniTripHUD = UIView()
		miniTripHUD.backgroundColor = .green.withAlphaComponent(0.25)
		stackView.addArrangedSubview(miniTripHUD)
		constraints.append(miniTripHUD.aspectRatioConstraint())
		miniTripHUD.translatesAutoresizingMaskIntoConstraints = false
	}
}

#Preview {
	WidgetViewController(
		bikeComputerService: getBikeComputerService()
	)
}
```
